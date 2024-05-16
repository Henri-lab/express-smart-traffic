const db = require('../config/db.cjs');

class Traffic {
    static getAllTraffic() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM traffic', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static addTraffic(traffic) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO traffic SET ?', traffic, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static updateTraffic(id, newV, field) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE traffic SET vehicleflow = ? WHERE id = ?'
            if (field === 'default') sql = 'UPDATE traffic SET vehicleflow = ? WHERE id = ?';
            else if (field === 'vehicleflow') sql = 'UPDATE traffic SET vehicleflow = ? WHERE id = ?';
            else if (field === 'time') sql = 'UPDATE traffic SET time = ? WHERE id = ?';
            else if (field === 'path') sql = 'UPDATE traffic SET path = ? WHERE id = ?';
            else if (field === 'road') sql = 'UPDATE traffic SET path = ? WHERE id = ?';
            db.query(sql, [newV, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }



    static deleteTraffic(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM traffic WHERE id = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Traffic;
