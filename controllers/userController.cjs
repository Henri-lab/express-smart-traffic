const User = require('../models/User.cjs');


async function getUserByUsername(req, res) {
  const { username } = req.params;
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

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: 0, err: 'User not found' });
    }
    res.json({ status: 1, data: user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ status: 0, err: 'Server error' });
  }
}
async function deleteUserByUsername(req, res) {
  const { username } = req.params;
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
module.exports = {
  getUserByUsername,
  getUserById,
  deleteUserByUsername
};


