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

    const start = Date.now();
    const result = await Model.updateOne({}, updateQuery);
    console.log(`Query Time: ${Date.now() - start}ms`);

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
    const startTime = Date.now();
    try {
        const data = await Model.find({}, '-_id -__v'); 
        console.log(`Query time: ${Date.now() - startTime}ms`);
        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found.' });
        }
        res.json(data)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;