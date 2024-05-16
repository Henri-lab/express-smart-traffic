const express = require('express');
const TrafficController = require('../controllers/trafficController.cjs');

const router = express.Router();

router.get('/all', TrafficController.getAllTraffic);
router.post('/add', TrafficController.addTraffic);
router.put('/upload', TrafficController.updateTraffic);
router.delete('/delete/:id', TrafficController.deleteTraffic);

module.exports = router;
