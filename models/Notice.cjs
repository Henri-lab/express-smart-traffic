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

  create: async ({ id, time, content, username }) => {
    const sql = 'INSERT INTO notice (id, time, content, username) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [id, time, content, username], (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(id, 'id')
          resolve(result);
        }
      });
    });
  },

  update: async (id, { time, content }) => {
    if (!time) {
      const sql = 'UPDATE notice SET content = ? WHERE id = ?';;
      return new Promise((resolve, reject) => {
        db.query(sql, [content, id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
    if (!content) {
      if (!time) {
        const sql = 'UPDATE notice SET time = ? WHERE id = ?';;
        return new Promise((resolve, reject) => {
          db.query(sql, [time, id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
    }
    if (!content && !time) return null;
    else {
      const sql = 'UPDATE notice SET time = ?, content = ? WHERE id = ?';;
      return new Promise((resolve, reject) => {
        db.query(sql, [time, content, id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
  },

  delete: async ({ username }) => {
    const sql = 'DELETE FROM notice WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

module.exports = Notice;
