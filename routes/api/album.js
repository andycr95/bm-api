const express = require('express');
const albumController  = require('../../controllers/albumController');
const { createAlbumSchema, albumIdSchema, updateAlbumSchema} = require('../../utils/schemas/album');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function albumApi(app) { 
    const router = new express.Router();
    app.use('/api/albums', router)

    router.get('/', albumController.getAlbums);
    router.get('/latest', albumController.getLastAlbums);
    router.get('/:id', validationHandlers({ id: albumIdSchema }, 'params'), albumController.getAlbum);
    router.post('/', validationHandlers(createAlbumSchema), albumController.createAlbum);

 /*   router.put('/:id', validationHandlers({ id: albumIdSchema }, 'params'), validationHandlers(updateAlbumSchema), async function (req, res, next) { 
        const { id } = req.params 
        const { 'body': album } = req
        try {
            const UpdatedAlbumId = await albumService.UpdateAlbum({ id, album });
            res.status(200).json({
                data: UpdatedAlbumId,
                message: 'Album updated'
            })
        } catch (error) {
            next(error)
        }
    })

    router.delete('/:id', validationHandlers({ id: albumIdSchema }, 'params'), async function (req, res, next) { 
        const { id } = req.params 
        try {
            const DeletedAlbumId = await albumService.DeleteteAlbum({ id });
            res.status(200).json({
                data: DeletedAlbumId,
                message: 'Album deleted'
            })
        } catch (error) {
            next(error)
        }
    }) */
 }

module.exports = albumApi;
