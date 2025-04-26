const express = require('express');
const app = express();

const {sendData} = require('../controllers/AdminController');

app.get('/admin',sendData);

module.exports = app;