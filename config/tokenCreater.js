import { randomBytes } from 'crypto';

// 生成一个随机的JWT_SECRET
const jwtSecret = randomBytes(64).toString('hex');

console.log(jwtSecret);