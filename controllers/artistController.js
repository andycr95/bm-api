const artistCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const moment = require('moment')
moment.locale('es');

artistCtrl.getArtists = async (req, res, next) => {
    try {
        const okArtists = [];
        const artists = await Artist.find().sort({'_id': -1});
        for (let i = 0; i < artists.length; i++) {
            const a = artists[i];
            const tracks = await Track.find({'artist_id':a._id});
            const albums = await Album.find({'artist_id':a._id});
            const artist = {
                _id: a._id,
                name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: a.image,
                playcount: a.playcount,
                followers: a.followers,
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

artistCtrl.getPopularsArtists = async (req, res, next) => {
    try {
        const okArtists = [];
        const artists = await Artist.find().sort({playcount: -1}).limit(5);
        for (let i = 0; i < artists.length; i++) {
            const a = artists[i];
            const tracks = await Track.find({'artist_id':a._id});
            const albums = await Album.find({'artist_id':a._id});
            const artist = {
                _id: a._id,
                name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: a.image,
                playcount: a.playcount,
                followers: a.followers,
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
        const a = await Artist.findById(id);
        const tracks = await Track.find({'artist_id':a._id});
        const popular_tracks = await Track.find({'artist_id':a._id}).sort('playcount').limit(5);
        const last_tracks = await Track.find({'artist_id':a._id}).sort('-1').limit(5);
        const albums = await Album.find({'artist_id':a._id});
        const okTr = [];
        const okAl = [];
        const okLsTr = [];
        const okPlTr = [];
        for (let i = 0; i < popular_tracks.length; i++) {
            const t = popular_tracks[i];
            const al = await Album.findById(t.album_id);
            const album = {
                _id: al._id,
                title: al.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: al.image,
                artist: a,
                total_tracks: al.total_tracks,
                release_date: al.release_date,
                album_type: al.album_type,
                genres: al.genres
            }
            track = {
                _id : t._id,
                title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image : album.image,
                source : t.source,
                playcount : t.playcount,
                track_number : t.track_number,
                duration_ms : t.duration_ms,
                artist: a,
                album: album
            }
            okPlTr.push(track);
        }
        for (let i = 0; i < last_tracks.length; i++) {
            const t = last_tracks[i];
            const al = await Album.findById(t.album_id);
            const album = {
                _id: al._id,
                title: al.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: al.image,
                artist: a,
                total_tracks: al.total_tracks,
                release_date: al.release_date,
                album_type: al.album_type,
                genres: al.genres
            }
            track = {
                _id : t._id,
                title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image : album.image,
                source : t.source,
                playcount : t.playcount,
                track_number : t.track_number,
                duration_ms : t.duration_ms,
                artist: a,
                album: album
            }
            okLsTr.push(track);
        }
        for (let i = 0; i < tracks.length; i++) {
            const t = tracks[i];
            const album = await Album.findById(t.album_id);
            const al = {
                _id: album._id,
                title: album.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: album.image,
                artist: a,
                total_tracks: album.total_tracks,
                release_date: moment(album.release_date).format('LL'),
                album_type: album.album_type,
                genres: album.genres
            }
            track = {
                _id : t._id,
                title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image : album.image,
                source : t.source,
                playcount : t.playcount,
                track_number : t.track_number,
                duration_ms : t.duration_ms,
                artist: a,
                album: al
            }
            okTr.push(track);
        }
        for (let i = 0; i < albums.length; i++) {
            const t = albums[i];
            const okTr = [];
            const trs = await Track.find({'album_id':t._id}).sort('track_number');
            const album = {
                _id: t._id,
                title: t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                image: t.image,
                artist: a,
                total_tracks: t.total_tracks,
                release_date: moment(t.release_date).format('LL'),
                album_type: t.album_type,
                genres: t.genres,
                tracks: okTr
            }
            for (let i = 0; i < trs.length; i++) {
                const t = trs[i];
                track = {
                    _id : t._id,
                    title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image : a.image,
                    source : t.source,
                    playcount : t.playcount,
                    track_number : t.track_number,
                    duration_ms : t.duration_ms,
                    artist: a,
                    album: t
                }
                okTr.push(track);
            }
            okAl.push(album);
        }
        const artist = {
            _id: a._id,
            name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            image: a.image,
            playcount: a.playcount,
            followers: a.followers,
            albums: okAl,
            tracks: okTr,
            last_tracks: okLsTr,
            popular_tracks: okPlTr,
            genres: a.genres
        }
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