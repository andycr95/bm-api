const express = require('express');

function routes(app) { 
    const router = new express.Router();
    app.use('/', router);
 }

module.exports = routes;
