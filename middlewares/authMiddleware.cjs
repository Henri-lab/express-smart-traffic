const jwt = require('jsonwebtoken');
require('dotenv').config();


// 验证token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // 使用自定义头 smartTraffic-access-token 
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

    req.userId = decoded.id;// decoded.id将包含JWT令牌中解码的用户ID
    next();
  });
};

module.exports = { verifyToken }

