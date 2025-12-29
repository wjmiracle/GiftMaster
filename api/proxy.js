const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.VOLCENGINE_API_KEY, // Vercel 环境变量
      baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    });

    const completion = await openai.chat.completions.create({
      model: req.body.model || 'ep-20251228234558-4kq5g', // 你的 ID
      messages: req.body.messages,
      temperature: req.body.temperature || 0.7,
      max_tokens: req.body.max_tokens || 1500,
      stream: false
    });

    res.json(completion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
