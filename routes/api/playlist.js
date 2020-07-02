const express = require('express');
const playlistController  = require('../../controllers/playlistController');
const { createplaylistSchema, playlistIdSchema, updateplaylistSchema} = require('../../utils/schemas/playlist');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function playlistApi(app) { 
    const router = new express.Router();
    app.use('/api/playlists', router)

    router.get('/', playlistController.getPlaylists);
    router.get('/:id', validationHandlers({ id: playlistIdSchema }, 'params'), playlistController.getPlaylist);
    router.post('/', validationHandlers(createplaylistSchema), playlistController.createPlaylist);

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

module.exports = playlistApi;
