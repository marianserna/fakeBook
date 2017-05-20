const express = require('express');
const morgan = require('morgan');
// Allows you to work with file and directory paths
const path = require('path');
const request = require('request');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets: serve files within build folder
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// PROXY
app.get('/photo', function(req, res) {
  request.get(req.query.url).pipe(res);
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
