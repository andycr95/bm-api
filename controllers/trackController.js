const trackCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')

trackCtrl.getTrack = async (req, res, next) => {
    const { id } = req.params;
    try {
        const track = await Track.findById(id);
        const artist = await Artist.findById(track.artist_id);
        const album = await Album.findById(track.album_id);
        const respo = {
            _id : track._id,
            title : track.title,
            image: album.image,
            source : track.source,
            playcount : track.playcount,
            track_number : track.track_number,
            duration_ms : track.duration_ms,
            artist,
            album
        }
        res.status(200).json(respo);
    } catch (error) {
        next(error)
    }
}

trackCtrl.getTracks = async (req, res, next) => {
    try {
        const tracks = await Track.find();
        const okTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            const e = tracks[i];
            const artist = await Artist.findById(e.artist_id);
            const album = await Album.findById(e.album_id);
            const respo = {
                _id : e._id,
                title : e.title,
                image: album.image,
                artist,
                album,
                playcount : e.playcount,
                track_number : e.track_number,
                source : e.source,
                duration_ms : e.duration_ms
            }
            okTracks.push(respo);
        }
        res.status(200).json(okTracks);
    } catch (error) {
        next(error)
    }
}

trackCtrl.createTrack = async (req, res) => {
    const { body: track } = req
    try {
        const tr = new Track({
            title : track.title,
            source : track.source,
            album_id : track.album_id,
            artist_id : track.artist_id,
            playcount : track.playcount,
            track_number : track.track_number,
            duration_ms : track.duration_ms,
        })
        await tr.save()
        res.status(201).json({
            message: 'Track created'
        })
    } catch (error) {
        next(error)
    }
}

trackCtrl.updateCategory = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

trackCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = trackCtrl