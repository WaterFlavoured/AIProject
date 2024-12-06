const express = require('express');
const Model = require('../model/model'); // imports from model.js

const router = express.Router();

// Posts chat to database
router.post('/chat/:id', async (req, res) => {
  console.log("Request received for chat ID:", req.params.id);
  try {
      const chatId = parseInt(req.params.id);
      const { id, who, text } = req.body;

      const chat = await Model.findOne({ id: chatId });

      chat.messages.push({ id, who, text });
      await chat.save();

      res.status(200).json({ message: 'Message added successfully.', chat });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Method
router.patch('/delete/:id', async (req, res) => {
  try {
      const chatId = parseInt(req.params.id);

      const chat = await Model.findOne({ id: chatId });
      if (!chat) {
          return res.status(404).json({ error: 'Chat not found.' });
      }

      chat.messages = [];
      await chat.save();

      res.status(200).json({ message: 'All messages cleared successfully.', chat });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get by ID Method
router.get('/get/:id', async (req, res) => {
  try {
    const chatId = parseInt(req.params.id);
    const chat = await Model.findOne({ id: chatId }, '-_id -__v');
    
    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;