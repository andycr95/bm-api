const trackCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const moment = require('moment')
moment.locale('es');
const jwt = require('jsonwebtoken')

trackCtrl.getTrack = async (req, res, next) => {
    const { id } = req.params;
    const decoded = await jwt.verify(token, 'shhhhh');
    try {
        const track = await Track.findById(id);
        const art = await Artist.findById(a.artist_id);
        const album = await Album.findById(track.album_id);
        const artist = {
            _id: art._id,
            name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: art.image,
            playcount: art.playcount,
            followers: art.followers,
            genres: art.genres
        }
        const al = {
            _id: album._id,
            title: album.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: album.image,
            artist: artist,
            total_tracks: album.total_tracks,
            release_date: moment(album.release_date).format('LL'),
            album_type: album.album_type,
            genres: album.genres
        }
        const respo = {
            _id : track._id,
            title : track.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: album.image,
            source : track.source,
            playcount : track.playcount,
            track_number : track.track_number,
            duration_ms : track.duration_ms,
            artist,
            album
        }
        res.status(200).json({
            decoded,
            respo
        });
    } catch (error) {
        next(error)
    }
}

trackCtrl.getTracks = async (req, res, next) => {
    try {
        const tracks = await Track.find().sort({'_id': -1});
        const okTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            const e = tracks[i];
            const art = await Artist.findById(e.artist_id);
            const album = await Album.findById(e.album_id);
            const artist = {
                _id: art._id,
                name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: art.image,
                playcount: art.playcount,
                followers: art.followers,
                genres: art.genres
            }
            const al = {
                _id: album._id,
                title: album.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: album.image,
                artist: artist,
                total_tracks: album.total_tracks,
                release_date: moment(album.release_date).format('LL'),
                album_type: album.album_type,
                genres: album.genres
            }
            const respo = {
                _id : e._id,
                title : e.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: album.image,
                artist,
                al,
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

trackCtrl.getTracksHits = async (req, res, next) => {
    try {
        const respoTr = [];
        const tracks = await Track.find().sort({_id: -1}).limit(20);
        if (tracks.length > 0) {
            for (let i = 0; i < tracks.length; i++) {
                const e = tracks[i];
                const a = await Artist.findById(e.artist_id);
                const al = await Album.findById(e.album_id);
                const album = {
                    _id: al._id,
                    title: al.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: al.image,
                    total_tracks: al.total_tracks,
                    release_date: moment(al.release_date).format('LL'),
                    album_type: al.album_type,
                }
                const artist = {
                    _id: a._id,
                    name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: a.image,
                }
                const respo = {
                    _id : e._id,
                    title : e.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: album.image,
                    playcount : e.playcount,
                    track_number : e.track_number,
                    source : e.source,
                    duration_ms : e.duration_ms,
                    album,
                    artist
                }
                respoTr.push(respo);
            }
        }
        res.status(200).json(respoTr);
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

trackCtrl.updatePlayCount = async (req, res) => {
    const { id } = req.params
    const tr = await Track.findById(id);
    const al = await Album.findById(tr.album_id);
    const ar = await Artist.findById(tr.artist_id);
    const track = {
        playcount: (tr.playcount + 1)
    }
    await tr.updateOne({ $set: track }, { oldEnough: true });

    const album = {
        playcount: (al.playcount + 1)
    }
    await al.updateOne({ $set: album }, { oldEnough: true });

    const artist = {
        playcount: (ar.playcount + 1)
    }
    await ar.updateOne({ $set: artist }, { oldEnough: true });
    res.json({
        status: 'Track Updated'
    })
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