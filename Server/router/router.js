const express = require('express');
const sheetsController = require('../controllers/sheetsController');

const Router = express.Router();

Router.get('/getSheets', sheetsController.getSheets);
Router.post('/postSheets', sheetsController.postData);


module.exports = Router;