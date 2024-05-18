const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.cjs');
const authRoutes = require('./routes/authRoutes.cjs');
const trafficRoutes = require('./routes/trafficRoutes.cjs')
const eventRoutes = require('./routes/eventRoutes.cjs')
const noticeRoutes = require('./routes/noticeRoutes.cjs')

const app = express();
const port = 3036;

// 所有路由：解析 JSON 请求体 并存在req.body
app.use(express.json());

// 使用 cors 中间件
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // 允许的前端来源
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true // 允许携带凭证（如 Cookie）
}));

// 数据要求json
app.post('/', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).send('Content-Type must be application/json');
  }

  console.log('JSON Data:', req.body);
  res.send('JSON data received');
});
// api入口设计
app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/traffic', trafficRoutes)
app.use('/event', eventRoutes)
app.use('/notice', noticeRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
