const playlistCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const Playlist = require('../models/playlist')
const moment = require('moment')
moment.locale('es');

playlistCtrl.getPlaylists = async (req, res, next) => {
    try {
        const respo = [];
        const playlists = await Playlist.find().sort({'_id': -1});
        for (let i = 0; i < playlists.length; i++) {
            const p = playlists[i];
            const okTrs = [];
            for (let j = 0; j < p.tracks.length; j++) {
                const t = p.tracks[j];
                const tr = await Track.findById(t._id);
                const art = await Artist.findById(tr.artist_id);
                const album = await Album.findById(tr.album_id);
                const artist = {
                    _id: art._id,
                    name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: art.image,
                    playcount: art.playcount,
                    followers: art.followers,
                    genres: art.genres
                }
                const track = {
                    _id : tr._id,
                    title : tr.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image : album.image,
                    source : tr.source,
                    playcount : tr.playcount,
                    track_number : tr.track_number,
                    duration_ms : tr.duration_ms,
                    artist,
                    album
                }
                okTrs.push(track);
            }
            const playlist = {
                _id: p._id,
                title : p.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image : p.image,
                description : p.description,
                public : p.public,
                tracks: okTrs,
                back_image : p.back_image,
            }
            respo.push(playlist);
        }
        res.status(200).json(respo);
    } catch (error) {
        next(error)
    }
}

playlistCtrl.getPlaylist = async (req, res, next) => {
    const { id } = req.params;
    try {
        const p = await Playlist.findById(id);
        const okTrs = [];
        for (let j = 0; j < p.tracks.length; j++) {
            const t = p.tracks[j];
            const tr = await Track.findById(t._id);
            const artist = await Artist.findById(tr.artist_id);
            const album = await Album.findById(tr.album_id);
            const track = {
                _id : tr._id,
                title : tr.title,
                image : album.image,
                source : tr.source,
                playcount : tr.playcount,
                track_number : tr.track_number,
                duration_ms : tr.duration_ms,
                artist,
                album
            }
            okTrs.push(track);
        }
        const playlist = {
            _id: p._id,
            image : p.image,
            title : p.title,
            description : p.description,
            public : p.public,
            tracks: okTrs,
            back_image : p.back_image,
        }
        res.status(200).json(playlist);
    } catch (error) {
        next(error)
    }
}

playlistCtrl.createPlaylist = async (req, res) => {
    const { body: playlist } = req
    try {
        const tr = new Playlist({
            title : playlist.title,
            description : playlist.description,
            image : playlist.image,
            back_image : playlist.back_image,
            tracks : playlist.tracks,
            public : playlist.public
        })
        await tr.save()
        res.status(201).json({
            message: 'playlist created'
        })
    } catch (error) {
        next(error)
    }
}

playlistCtrl.updateCategory = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

playlistCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = playlistCtrl