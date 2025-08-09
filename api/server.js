const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

// Your existing routes here
app.get('/', (req, res) => {
  res.send('Serverless API is working!');
});

// Export the app as a serverless function
module.exports = app;
