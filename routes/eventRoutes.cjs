const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.cjs');

router.get('/all', eventController.getAllEvents);
router.get('/eventSearch/id/:id', eventController.getEventById);
router.post('/create', eventController.createEvent);
router.put('/update/:id', eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);

module.exports = router;
