const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController.cjs');

router.get('/all', noticeController.getAllNotices);
router.get('/noticeSearch/', noticeController.getNoticeById);
router.post('/create',  noticeController.createNotice);
router.post('/update/', noticeController.updateNotice);
router.post('/delete/', noticeController.deleteNotice);
//有时由于浏览器、代理服务器或防火墙的限制，DELETE 请求可能不被允许或拦截，这时可以使用 POST 请求来替代

module.exports = router;