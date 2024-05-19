const express = require('express');
const TrafficController = require('../controllers/trafficController.cjs');

const router = express.Router();

router.get('/all', TrafficController.getAllTraffic);
router.post('/add', TrafficController.addTraffic);
router.put('/upload', TrafficController.updateTraffic);
router.post('/delete/:id', TrafficController.deleteTraffic);
//有时由于浏览器、代理服务器或防火墙的限制，DELETE 请求可能不被允许或拦截，这时可以使用 POST 请求来替代

module.exports = router;
