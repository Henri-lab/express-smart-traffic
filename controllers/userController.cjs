const User = require('../models/User.cjs');


async function getUserByUsername(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function deleteUserByUsername(req, res) {
  const { username } = req.params;
  try {
    // 查找用户
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ err: 'User not found' });

    await User.deleteByUsername(username);

    res.status(200).json({ message: `delete ${username} successfully` });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ err: 'Server error' });
  }
}
module.exports = {
  getUserByUsername,
  getUserById,
  deleteUserByUsername
};


