const crypto = require('crypto');

// 生成一个随机的JWT_SECRET
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log(jwtSecret);