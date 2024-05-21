const User = require('../models/User.cjs');


async function getUserByUsername(req, res) {
  const { username } = req.query;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ status: 0, err: 'User not found' });
    }
    res.json({ status: 1, data: user });
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

async function getUserAllByType(req, res) {
  const { type } = req.query;
  try {
    const users = await User.getUsersByType(type);
    if (users == []) {
      return res.status(404).json({ status: 0, err: `No User type is ${type} ` });
    }
    res.status(200).json({ status: 1, data: users });
  } catch (error) {
    console.error('Error fetching user by type:', error);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

async function getUserAllByIsOnline(req, res) {
  const { isOnline } = req.query;
  try {
    const users = await User.getUsersByIsOnline(isOnline);
    if (users == []) {
      return res.status(404).json({ status: 0, err: `No User type is ${type} ` });
    }
    res.json({ status: 1, data: users });
  } catch (error) {
    console.error('Error fetching user by onLineState:', error);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

async function getUserAll(req, res) {
  try {
    const users = await User.getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ status: 0, err: 'No user yet' });
    }
    res.json({ status: 1, data: users });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

async function deleteUserByUsername(req, res) {
  const { username } = req.query;
  console.log('delete user by username:', username)
  try {
    // 查找用户
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ status: 0, err: 'User not found' });

    await User.deleteByUsername(username);

    res.status(200).json({ status: 1, msg: `delete ${username} successfully` });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

const changeTypeByUsername = async (req, res) => {
  const { username, type } = req.body;
  try {
    // 查找用户
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ status: 0, err: 'User not found' });

    // 更新用户的在线状态
    await User.updateTypeByUsername(username, type);

    res.status(200).json({ status: 1, msg: 'user type changed successfully' });
  } catch (err) {
    console.error('Error changing user type:', err);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}

module.exports = {
  getUserAll,
  getUserAllByType,
  getUserAllByIsOnline,
  getUserByUsername,
  deleteUserByUsername,
  changeTypeByUsername,
};


