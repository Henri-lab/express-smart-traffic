// const mysql = require('mysql');
// require('dotenv').config();

// const pool = mysql.createPool({
//     connectionLimit: 10, // 最大连接数
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     waitForConnections: true,  // 是否等待连接可用（如果达到连接池限制）
//     queueLimit: 0,  // 队列中的最大请求数（0 表示无限制）
//     acquireTimeout: 10000,  // 获取连接的超时时间（毫秒）
//     connectTimeout: 10000,  // 建立连接的超时时间（毫秒）
//     debug: false  // 是否开启调试模式
// });


// // 处理连接池错误
// pool.on('connection', connection => {
//     console.log('MySQL Connection established');
// });

// pool.on('acquire', connection => {
//     console.log('Connection %d acquired', connection.threadId);
// });

// pool.on('release', connection => {
//     console.log('Connection %d released', connection.threadId);
// });

// pool.on('error', err => {
//     console.error('MySQL Pool Error: ', err);
// });

// // 
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('MySQL connection error:', err);
//         throw err;
//     }
//     console.log('MySQL Connected...');
//     return connection;
// });
// module.exports = pool;
