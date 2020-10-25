const express = require('express');
const searchController  = require('../../controllers/searchController');

function searchApi(app) { 
    const router = new express.Router();
    app.use('/api/search', router)

    router.get('/', searchController.getSearch);
 }

module.exports = searchApi;
