const db = require('../config/db.cjs');

const promisifyQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Event = {
    getAll: async () => {
        const sql = 'SELECT * FROM event';
        return promisifyQuery(sql);
    },

    getById: async (id) => {
        const sql = 'SELECT * FROM event WHERE id = ?';
        return promisifyQuery(sql, [id]);
    },

    create: async (event) => {
        const sql = 'INSERT INTO event SET ?';
        return promisifyQuery(sql, event);
    },

    update: async (id, event) => {
        const sql = 'UPDATE event SET ? WHERE id = ?';
        return promisifyQuery(sql, [event, id]);
    },

    delete: async (id) => {
        const sql = 'DELETE FROM event WHERE id = ?';
        return promisifyQuery(sql, [id]);
    }
};

module.exports = Event;
