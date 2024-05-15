const express = require('express');
const router = express.Router();
const { getUserByUsername, getUserById, deleteUserByUsername } = require('../controllers/userController.cjs');

// 管理员
router.get('/userSearch/username/:username', getUserByUsername);
router.get('/userSearch/id/:id', getUserById);
router.get('/userDelete/username/:username', deleteUserByUsername);


module.exports = router;