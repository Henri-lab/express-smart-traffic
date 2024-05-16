const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController.cjs');

router.get('/all', noticeController.getAllNotices);
router.get('/noticeSearch/:id', noticeController.getNoticeById);
router.post('/create',  noticeController.createNotice);
router.put('/update/:id', noticeController.updateNotice);
router.delete('/delete/:id', noticeController.deleteNotice);

module.exports = router;