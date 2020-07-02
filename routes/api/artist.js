const express = require('express');
const artistController  = require('../../controllers/artistController');
const { createArtistSchema, artistIdSchema, updateArtistSchema} = require('../../utils/schemas/artist');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function artistApi(app) { 
    const router = new express.Router();
    app.use('/api/artists', router)

    router.get('/', artistController.getArtists);
    router.get('/:id', validationHandlers({ id: artistIdSchema }, 'params'), artistController.getArtist);
    router.get('/:id/albums', validationHandlers({ id: artistIdSchema }, 'params'), artistController.getAlbumArtist);
    router.post('/', validationHandlers(createArtistSchema), artistController.createArtist);


/*     

    router.put('/:id', validationHandlers({ id: artistIdSchema }, 'params'), validationHandlers(updateArtistSchema), async function (req, res, next) { 
        const { id } = req.params 
        const { 'body': artist } = req
        try {
            const UpdatedArtistId = await artistService.UpdateArtist({ id, artist });
            res.status(200).json({
                data: UpdatedArtistId,
                message: 'Artist updated'
            })
        } catch (error) {
            next(error)
        }
    })

    router.delete('/:id', validationHandlers({ id: artistIdSchema }, 'params'), async function (req, res, next) { 
        const { id } = req.params 
        try {
            const DeletedArtistId = await artistService.DeleteteArtist({ id });
            res.status(200).json({
                data: DeletedArtistId,
                message: 'Artist deleted'
            })
        } catch (error) {
            next(error)
        }
    }) */
 }

module.exports = artistApi;
