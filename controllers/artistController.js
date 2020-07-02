const artistCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')

artistCtrl.getArtists = async (req, res, next) => {
    try {
        const okArtists = [];
        const artists = await Artist.find();
        for (let i = 0; i < artists.length; i++) {
            const a = artists[i];
            const tracks = await Track.find({'artist_id':a._id});
            const albums = await Album.find({'artist_id':a._id});
            const artist = {
                _id: a._id,
                name: a.name,
                image: a.image,
                albums: albums.length,
                tracks: tracks.length,
                genres: a.genres
            }
            okArtists.push(artist);
        }
        res.status(200).json(okArtists);
    } catch (error) {
        next(error)
    }
}

artistCtrl.getArtist = async (req, res, next) => {
    const { id } = req.params;
    try {
        const artist = await Artist.findById(id);
        res.status(200).json(artist);
    } catch (error) {
        next(error)
    }
}

artistCtrl.getAlbumArtist = async (req, res, next) => {
    const { id } = req.params;
    try {
        const albums = await Album.find({'artist_id':id});
        res.status(200).json(albums);
    } catch (error) {
        next(error)
    }
}

artistCtrl.createArtist = async (req, res) => {
    const { body: artist } = req
    try {
        const art = new Artist({
            name: artist.name,
            image: artist.image,
            genres: artist.genres
        })
        await art.save()
        res.status(201).json({
            message: 'Artist created'
        })
    } catch (error) {
        next(error)
    }
}

artistCtrl.updateCategory = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

artistCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = artistCtrl