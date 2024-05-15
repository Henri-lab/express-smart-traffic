const express = require('express');
const userRoutes = require('./routes/userRoutes.cjs');
const authRoutes = require('./routes/authRoutes.cjs');

const app = express();
const port = 3036;

// 所有路由：解析 JSON 请求体 并存在req.body
app.use(express.json());
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
