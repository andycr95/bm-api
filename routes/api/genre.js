const express = require('express');
const genreController  = require('../../controllers/genreController');
const { createGenreSchema, genreIdSchema, updateGenreSchema} = require('../../utils/schemas/genre');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function genreApi(app) { 
    const router = new express.Router();
    app.use('/api/genres', router)

    router.get('/', genreController.getGenres);
    router.get('/:id', validationHandlers({ id: genreIdSchema }, 'params'), genreController.getGenre);
    router.post('/', validationHandlers(createGenreSchema), genreController.createGenre);
 }

module.exports = genreApi;
