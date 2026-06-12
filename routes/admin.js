const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // ensure model exists

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Admin fetch messages error:", err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;