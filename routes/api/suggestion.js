const express = require('express');
const suggestionsController  = require('../../controllers/suggestionsController');

function searchApi(app) { 
    const router = new express.Router();
    app.use('/api/suggestions', router)

    router.get('/', suggestionsController.getSuggestions);
    router.get('/albums/:id', suggestionsController.getSuggestionsAlbum);
    router.get('/artists/:id', suggestionsController.getSuggestionsArtist);
    router.get('/tracks/:id', suggestionsController.getSuggestionsTrack);
 }

module.exports = searchApi;
