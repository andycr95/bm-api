const albumCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const moment = require('moment');
moment.locale('es');

albumCtrl.getAlbums = async (req, res, next) => {
    try {
        const respo = [];
        const albums = await Album.find().sort({'_id': -1});
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracks = await Track.find({'album_id':a._id}).sort('track_number');
            const art = await Artist.findById(a.artist_id);
            const okTr = [];
            const artist = {
                _id: art._id,
                name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: art.image,
                playcount: art.playcount,
                followers: art.followers,
                genres: art.genres
            }
            for (let i = 0; i < tracks.length; i++) {
                const t = tracks[i];
                track = {
                    _id : t._id,
                    title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image : a.image,
                    source : t.source,
                    playcount : t.playcount,
                    track_number : t.track_number,
                    duration_ms : t.duration_ms,
                    artist: artist,
                    album: a
                }
                okTr.push(track);
            }
            const album = {
                _id: a._id,
                title: a.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: a.image,
                artist: artist,
                total_tracks: a.total_tracks,
                release_date: moment(a.release_date).format('LL'),
                album_type: a.album_type,
                tracks: okTr,
                genres: a.genres
            }
            respo.push(album);
        }
        res.status(200).json(respo);
    } catch (error) {
        next(error)
    }
}

albumCtrl.getLastAlbums = async (req, res, next) => {
    try {
        const respo = [];
        const albums = await Album.find().sort({release_date: -1}).limit(5);
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracks = await Track.find({'album_id':a._id}).sort('track_number');
            const art = await Artist.findById(a.artist_id);
            const okTr = [];
            const artist = {
                _id: art._id,
                name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: art.image,
                playcount: art.playcount,
                followers: art.followers,
                genres: art.genres
            }
            for (let i = 0; i < tracks.length; i++) {
                const t = tracks[i];
                track = {
                    _id : t._id,
                    title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image : a.image,
                    source : t.source,
                    playcount : t.playcount,
                    track_number : t.track_number,
                    duration_ms : t.duration_ms,
                    artist: artist,
                    album: a
                }
                okTr.push(track);
            }
            const album = {
                _id: a._id,
                title: a.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: a.image,
                artist: artist,
                total_tracks: a.total_tracks,
                release_date: moment(a.release_date).format('LL'),
                album_type: a.album_type,
                tracks: okTr,
                genres: a.genres
            }
            respo.push(album);
        }
        res.status(200).json(respo);
    } catch (error) {
        next(error)
    }
}

albumCtrl.getAlbum = async (req, res, next) => {
    const { id } = req.params;
    try {
        const album = await Album.findById(id);
        const tracks = await Track.find({'album_id':album._id}).sort('track_number');
        const art = await Artist.findById(album.artist_id);
        const okTr = [];
        const artist = {
            _id: art._id,
            name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: art.image,
            playcount: art.playcount,
            followers: art.followers,
            genres: art.genres
        }
        for (let i = 0; i < tracks.length; i++) {
            const t = tracks[i];
            track = {
                _id : t._id,
                title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image : album.image,
                source : t.source,
                playcount : t.playcount,
                track_number : t.track_number,
                duration_ms : t.duration_ms,
                artist: artist,
                album: album
            }
            okTr.push(track);
        }
        const a = {
            _id: album._id,
            title: album.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: album.image,
            artist: artist,
            total_tracks: album.total_tracks,
            release_date: moment(album.release_date).format('LL'),
            album_type: album.album_type,
            tracks: okTr,
            genres: album.genres
        }
        res.status(200).json(a);
    } catch (error) {
        next(error)
    }
}

albumCtrl.createAlbum = async (req, res) => {
    const { body: album } = req
    try {
        const tr = new Album({
            album_type: album.album_type,
            artist_id: album.artist_id,
            image: album.image,
            title: album.title.toLowerCase(),
            release_date: album.release_date,
            total_tracks: album.total_tracks,
            playcount: 0,
            genres: album.genres
        })
        await tr.save()
        res.status(201).json({
            message: 'Album created'
        })
    } catch (error) {
        next(error)
    }
}

albumCtrl.updateCategory = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

albumCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = albumCtrl