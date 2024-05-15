const express = require('express');
const router = express.Router();
const {
    register,
    register_force,
    login,
    logout,
    me,
    changeOlineState,
    changePassword,
    deleteAccout,
}
    = require('../controllers/authController.cjs');
const { verifyToken } = require('../middlewares/authMiddleware.cjs');

// 公有
router.post('/register', register);
router.post('/registerForce', register_force);

// 用户私有
// 中间件的验证生成'userId'：id
router.post('/login', login);//生成token（带id）
router.post('/logout', logout);
router.post('/onlineState', verifyToken, changeOlineState)
router.post('/password', verifyToken, changePassword)
router.post('/delete', verifyToken, deleteAccout)
router.get('/me', verifyToken, me);

module.exports = router;
