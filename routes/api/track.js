const express = require('express');
const tracksController  = require('../../controllers/trackController');
const { createTrackSchema, trackIdSchema, updateTrackSchema} = require('../../utils/schemas/tracks');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function trackApi(app) { 
    const router = new express.Router();
    app.use('/api/tracks', router)

    router.get('/', tracksController.getTracks);
    router.get('/hits', tracksController.getTracksHits);
    router.get('/:id', validationHandlers({ id: trackIdSchema }, 'params'), tracksController.getTrack);
    router.post('/', validationHandlers(createTrackSchema), tracksController.createTrack);
    router.put('/:id/playcount', validationHandlers({ id: trackIdSchema }, 'params'), tracksController.updatePlayCount);
    router.put('/:id', validationHandlers({ id: trackIdSchema }, 'params'), validationHandlers(updateTrackSchema), tracksController.updateCategory);
    router.delete('/:id', validationHandlers({ id: trackIdSchema }, 'params'), tracksController.deleteCategory);
 }

module.exports = trackApi;
 