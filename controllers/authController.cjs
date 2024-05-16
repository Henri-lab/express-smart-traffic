const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');
require('dotenv').config();

const register = async (req, res) => {
  const { id, username, password, type, isOnline } = req.body;
  // 在axios的拦截器中定义的req.body
  bcrypt.hash(password, 8, async (err, hash) => {
    if (err) return res.status(500).json({ message: 'hash error', err, });
    const hashedPassword = hash
    try {
      const user = await User.findByUsername(username)
      if (user) return res.status(409).json({ err: 'username has existed!' });
      const result = await User.create(id, username, hashedPassword, type, isOnline);
      // 用户创建成功，返回状态码，提示，数据库用户ID，唯一用户名
      res.status(201).json({ message: 'User registered successfully', key: result.key, mysqlUsername: result.mysql_username });
    } catch (err) {
      console.error('Unexpected error during registered:', err);
      res.status(500).send('Error on the server');
    }
  });


};

const register_force = async (req, res) => {
  const { id, username, password, type, isOnline } = req.body;
  // 在axios的拦截器中定义的req.body
  bcrypt.hash(password, 8, async (err, hash) => {
    if (err) return res.status(500).json({ message: 'hash error', err, });
    const hashedPassword = hash
    try {
      const result = await User.create(id, username, hashedPassword, type, isOnline);
      // 用户创建成功，返回状态码，提示，数据库用户ID，唯一用户名
      res.status(201).json({ message: 'User registered successfully', mysqlId: result.mysql_id, mysqlUsername: result.mysql_username });
    } catch (err) {
      console.error('Unexpected error during registered:', err);
      res.status(500).send('Error on the server');
    }
  });
};

// login 名字定位
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username)
    if (!user) return res.status(404).json({ err: 'No user found' });

    const isMatch = await bcrypt.compare(password, user.password)
    // 是将第一个参数（未加密的密码）与第二个参数（已哈希化的密码）进行比较
    if (!isMatch) return res.status(401).json({ auth: false, token: null });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });//decoded会记录id
    res.status(200).json({ auth: true, token: token });

  } catch (err) {
    console.error('Unexpected error during login:', err);
    res.status(500).json({ err: 'Error on the server' });
  }
};

const logout = (req, res) => {
  res.status(200).json({ auth: false, token: null });
};


const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);//middleware 生成 userId
    if (!user) return res.status(404).send('No user found');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: 'There was a problem finding the user' });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;//middleware 生成 userId
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ err: 'User not found' });

    // 验证当前密码是否正确
    const isMatch = await User.comparePassword(currentPassword, user.password)
    if (!isMatch) return res.status(401).json({ err: 'Current password is incorrect' });
    // 更新密码
    bcrypt.hash(newPassword, 8, async (err, hash) => {
      if (err) return res.status(500).json({ err: 'Server error' });
      const newHashedPassword = hash
      console.log(newHashedPassword, 'newHashedPassword')
      await User.updatePassword(userId, newHashedPassword);
      res.status(200).json({ message: 'password updated' })

    })
  } catch (err) {
    console.error('Error updating password:', err)
    res.status(500).json({ err: 'Server error' });
  }
}

const changeOlineState = async (req, res) => {
  const { onlineState } = req.body;
  const userId = req.userId;
  try {
    // 查找用户
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ err: 'User not found' });

    // 更新用户的在线状态
    await User.updateOnlineState(userId, onlineState);

    res.status(200).json({ message: 'Online state changed successfully' });
  } catch (err) {
    console.error('Error changing online state:', err);
    res.status(500).json({ error: 'Server error' });
  }
}


const deleteAccout = async (req, res) => {
  const userId = req.userId;
  try {
    // 查找用户
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ err: 'User not found' });

    await User.deleteById(userId);

    res.status(200).json({ message: 'delete account successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  register,
  register_force,
  login,
  logout,
  me,
  changeOlineState,
  changePassword,
  deleteAccout,
}
