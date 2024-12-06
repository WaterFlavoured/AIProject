// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./app/routes/routes');
const server = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config(); // Allows for environment variables

// Middleware declaration
app.use(express.json()); 

app.use(cors());

// Connects to Cloud Database (MongoDB Atlas)
mongoose.connect(process.env.ATLAS_URI);
const db = mongoose.connection;

// Route
app.use('/api/v1', routes);

// Checks for a connection to the database
db.on('error', console.error.bind(console, 'connection error:'));

// Connect to DB one time only
db.once('connected', () => {
  console.log('Connected to MongoDB');
});


const port = process.env.PORT || 3000;
// Tells user the server is running
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));