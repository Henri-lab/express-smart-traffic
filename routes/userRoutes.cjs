const express = require('express');
const router = express.Router();
const { getUserAll,
    getUserAllByType,
    getUserAllByIsOnline,
    getUserByUsername,
    deleteUserByUsername,
    changeTypeByUsername, } = require('../controllers/userController.cjs');

// 管理员
router.get('/search/all', getUserAll);
router.get('/search/username', getUserByUsername);
router.get('/search/type', getUserAllByType);
router.get('/search/isOnline', getUserAllByIsOnline);
router.get('/delete/username', deleteUserByUsername);
router.post('/upload/username', changeTypeByUsername)
// get 请求更适合 请求参数
//有时由于浏览器、代理服务器或防火墙的限制，DELETE 请求可能不被允许或拦截，这时可以使用 POST 请求来替代


module.exports = router;