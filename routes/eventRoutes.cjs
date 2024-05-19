const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.cjs');

router.get('/all', eventController.getAllEvents);
router.get('/eventSearch/id/:id', eventController.getEventById);
router.post('/create', eventController.createEvent);
router.put('/update/:id', eventController.updateEvent);
router.post('/delete/:id', eventController.deleteEvent);
//有时由于浏览器、代理服务器或防火墙的限制，DELETE 请求可能不被允许或拦截，这时可以使用 POST 请求来替代

module.exports = router;
