const db = require('../config/db.cjs');

const Notice = {
  getAll: async () => {
    const sql = 'SELECT * FROM notice';
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM notice WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  create: async (notice) => {
    const sql = 'INSERT INTO notice SET ?';
    return new Promise((resolve, reject) => {
      db.query(sql, notice, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  update: async (id, notice) => {
    const sql = 'UPDATE notice SET ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [notice, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  delete: async (id) => {
    const sql = 'DELETE FROM notice WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};

module.exports = Notice;
