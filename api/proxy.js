// api/proxy.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://ark.cn-beijing.volcengineapi.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOLCENGINE_API_KEY}` // 从环境变量读取 Key
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`火山引擎 API 错误: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;