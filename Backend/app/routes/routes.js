const express = require('express');
const Model = require('../model/model'); // imports from model.js

const router = express.Router();

//Post Method
router.post('/post/:index', async (req, res) => {
  try {
    const { id, who, message } = req.body; // Destructure the id, who, and message from the request body
    const index = parseInt(req.params.index); // Get the index from the request parameters
    
    // Checks if any of the fields are missing
    if (!id || !who || !message) {
      return res.status(400).json({ error: 'All fields (id, who, message) are required.' });
    }
    
    // Push the new message as an object
    const updateQuery = {
      $push: {
        [`data.${index}`]: { id, who, message }, // Store as object directly using MongoDB querey of push
      },
    };

    const result = await Model.updateOne({}, updateQuery); // Updates the data in the database

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Data added successfully.' });
    } else {
      res.status(400).json({ error: 'Update failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Method
router.patch('/delete/:index', async (req, res) => {
    const parsedIndex = parseInt(req.params.index); // Parse the index from the request parameters
    try {
        const initialDocument = await Model.findOne({});

        if (!initialDocument) {
          return res.status(404).json({ error: 'No document found.' });
        }
    
        // Ensure that the data field exists and is an array
        if (!Array.isArray(initialDocument.data)) {
          return res.status(400).json({ error: 'The "data" field is not an array.' });
        }
    
        // Ensure that the specific index is valid (it should be an array)
        if (!Array.isArray(initialDocument.data[parsedIndex])) {
          return res.status(400).json({ error: `Index ${parsedIndex} is not a valid array.` });
        }
    
        // Clear the sub-array at the given index
        initialDocument.data[parsedIndex] = []; // Set the sub-array to an empty array
    
        // Save the updated document back to MongoDB
        await initialDocument.save();
        res.status(200).json({ message: `Sub-array at index ${parsedIndex} cleared successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find({}, '-_id');
        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found.' });
        }
        res.json(data)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;