// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const routes = require('./app/routes/routes');
require('dotenv').config(); // Allows for environment variables

// Middleware declaration
app.use(express.json()); 

// Connects to Cloud Database (MongoDB Atlas)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const db = mongoose.connection;

// Route
app.use('/api/v1', routes);

// Checks for a connection to the database
db.on('error', console.error.bind(console, 'connection error:'));

// Connect to DB one time only
db.once('connected', () => {
  console.log('Connected to MongoDB');
});

// Tells user the server is running
server.listen(3000, () => console.log('Server is running on http://localhost:3000'));