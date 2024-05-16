const Traffic = require('../models/Traffic.cjs');

class TrafficController {
    static async getAllTraffic(req, res) {
        try {
            const traffic = await Traffic.getAllTraffic();
            res.status(200).json({ status: 0, data: traffic });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 0, err: 'Server Error' });
        }
    }

    static async addTraffic(req, res) {
        const { path, road, vehicleflow, time } = req.body;
        const traffic = { path, road, vehicleflow, time };
        try {
            await Traffic.addTraffic(traffic);
            res.status(200).json({ status: 1, msg: 'Traffic added' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 0, err: 'Server Error' });
        }
    }

    static async updateTraffic(req, res) {
        const { id, value, filed } = req.body;
        try {
            await TrafficModel.updateTraffic(id, value, filed);
            res.status(200).json({ status: 1, msg: 'Traffic updated' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Server Error' });
        }
    }

    static async deleteTraffic(req, res) {
        const id = req.params.id;
        try {
            await Traffic.deleteTraffic(id);
            res.status(200).json({ status: 1, msg: 'Traffic deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 0, err: 'Server Error' });
        }
    }
}

module.exports = TrafficController;
