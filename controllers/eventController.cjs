const Event = require('../models/Event.cjs');

const getAllEvents = async (req, res) => {
    try {
        const results = await Event.getAll();
        res.status(200).json({ status: 1, data: results });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Event.getById(id);
        res.status(200).json({ status: 1, data: result });
    } catch (err) {
        res.status(500).json({ status: 0, err: err.message });
    }
};

const createEvent = async (req, res) => {
    const newEvent = req.body;
    try {
        const result = await Event.create(newEvent);
        res.status(201).json({ id: result.insertId, ...newEvent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;
    try {
        const result = await Event.update(id, updatedEvent);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Event.delete(id);
        res.status(200).json({ status: 1, data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
