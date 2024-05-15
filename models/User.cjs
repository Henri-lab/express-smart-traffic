const db = require('../config/db.cjs');
const crypto = require('crypto');

class User {
    static create(id, username, password, type, isOnline) {
        return new Promise((resolve, reject) => {
            const checkSql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            db.query(checkSql, [username], (err, results) => {
                if (err) {
                    console.error('Error checking username:', err);
                    return reject(err);
                }

                if (results.length > 0) {
                    const randomSuffix = crypto.randomBytes(3).toString('hex'); // 生成一个随机字符串
                    if (username.includes('@')) {
                        // 如果用户名已经包含下划线，则删除唯一标识性后缀
                        username = username.substring(0, username.lastIndexOf('@'));
                    }
                    const uniqueUsername = `${username}@${randomSuffix}`;
                    // 如果用户名存在，生成一个唯一的用户名
                    return User.create(id, uniqueUsername, password, type, isOnline)
                        // 递归调用 create 方法，使用新的唯一用户名
                        .then((result) => resolve({ mysql_id: result.insertId, mysql_username: uniqueUsername }))
                        // 返回生成的名称交给用户使用
                        .catch(reject);
                }

                // 如果用户名不存在，插入用户
                const insertSql = 'INSERT INTO users (id, username, password, type, isOnline) VALUES (?, ?, ?, ?, ?)';
                db.query(insertSql, [id, username, password, type, isOnline], (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return reject(err);
                    }
                    console.log('User inserted with ID:', result.insertId);
                    resolve({ mysql_id: result.insertId, mysql_username: username });
                });
            });
        });
    }


    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            // 在 MySQL 中，查询结果通常会返回一个数组
            // 只返回一个用户 ;前提：用户名唯一
            db.query(sql, [username], (err, results) => {
                if (err) {
                    console.error('Error finding user by username:', err);
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.log('Error finding user by ID', err);
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    };

    static updatePassword(id, pw) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET password = ? WHERE id = ?';
            db.query(sql, [pw, id], (err, results) => {
                if (err) {
                    console.log('Error updating password', err);
                    return reject(err);
                }
                resolve();//UPDATE 查询返回的是受影响的行数，而不是更新后的对象。
            });
        });
    };


    static updateOnlineState(id, onlineState) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET isOnline = ? WHERE id = ?';
            db.query(sql, [onlineState, id], (err, results) => {
                if (err) {
                    console.log('Error updating online state', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static deleteByUserName(username) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM users WHERE username = ?';
            db.query(sql, [username], (err, results) => {
                if (err) {
                    console.log('Error updating online state', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM users WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.log('Error updating online state', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

};


module.exports = User;
