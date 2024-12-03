// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./app/routes/routes');
require('dotenv').config(); // Allows for environment variables

// Middleware declaration
app.use(express.json()); 

// Connects to Cloud Database (MongoDB Atlas)
const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Route
app.use('/api/v1', routes);

// Checks for a connection to the database
db.on('error', console.error.bind(console, 'connection error:'));

// Connect to DB one time only
db.once('connected', () => {
  console.log('Connected to MongoDB');
});

module.exports = app;

// const port = process.env.PORT || 3000;
// Tells user the server is running
// server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));