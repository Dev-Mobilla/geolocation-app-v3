const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./router/router');
const serverless = require('serverless-http');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', Router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
})

module.exports = app
module.exports.handler = serverless(app)