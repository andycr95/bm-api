const suggestionsCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const moment = require('moment')
moment.locale('es');

suggestionsCtrl.getSuggestions = async (req, res, next) => {
    try {
        const respoAl = [];
        const respoTr = [];
        const respoAr = [];
        const tracks = await Track.find().sort({_id:1}).limit(2);
        const albums = await Album.find().sort({_id:1}).limit(3);
        const artists = await Artist.find().sort({_id:1}).limit(3);
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracksAl = await Track.find({'album_id':a._id}).sort('track_number');
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
            for (let i = 0; i < tracksAl.length; i++) {
                const t = tracksAl[i];
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
                total_tracks: a.total_tracks,
                release_date: moment(a.release_date).format('LL'),
                album_type: a.album_type,
                artist: artist,
                tracks: okTr,
                genres: a.genres
            }
            respoAl.push(album);
        }
        if (artists.length > 0) {
            for (let i = 0; i < artists.length; i++) {
                const a = artists[i];
                const tracks = await Track.find({'artist_id':a._id});
                const albums = await Album.find({'artist_id':a._id});
                const artist = {
                    _id: a._id,
                    name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: a.image,
                }
                respoAr.push(artist);
            }
        }
        if (tracks.length > 0) {
            for (let i = 0; i < tracks.length; i++) {
                const e = tracks[i];
                const a = await Artist.findById(e.artist_id);
                const album = await Album.findById(e.album_id);
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
                    artist
                }
                respoTr.push(respo);
            }
        }
        res.status(200).json({
            tracks: respoTr,
            albums: respoAl,
            artists: respoAr
        });
    } catch (error) {
        next(error)
    }
}

suggestionsCtrl.getSuggestionsAlbum = async (req, res, next) => {
    const { id } = req.params;
    try {
        const respoAl = [];
        const album = await Album.findById(id);
        const albums = await Album.find({$or: [{ genres: { $regex: album.genres[0]}}, { genres: {$regex: album.genres[1]}}]}).where('_id').ne(id).limit(4);
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracksAl = await Track.find({'album_id':a._id}).sort('track_number');
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
            for (let i = 0; i < tracksAl.length; i++) {
                const t = tracksAl[i];
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
                total_tracks: a.total_tracks,
                release_date: moment(a.release_date).format('LL'),
                album_type: a.album_type,
                artist: artist,
                tracks: okTr,
                genres: a.genres
            }
            respoAl.push(album);
        }
        res.status(200).json({
            albums: respoAl,
        });
    } catch (error) {
        next(error)
    }
}

suggestionsCtrl.getSuggestionsArtist = async (req, res, next) => {
    const { id } = req.params;
    try {
        const respoAr = [];
        const artist = await Artist.findById(id);
        const artists = await Artist.find({$or: [{ genres: { $regex: artist.genres[0]}}, { genres: {$regex: artist.genres[1]}}]}).where('_id').ne(id).limit(4);
        if (artists.length > 0) {
            for (let i = 0; i < artists.length; i++) {
                const a = artists[i];
                const tracks = await Track.find({'artist_id':a._id});
                const albums = await Album.find({'artist_id':a._id});
                const artist = {
                    _id: a._id,
                    name: a.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: a.image,
                }
                respoAr.push(artist);
            }
        }
        res.status(200).json({
            artists: respoAr,
        });
    } catch (error) {
        next(error)
    }
}

suggestionsCtrl.getSuggestionsTrack = async (req, res, next) => {
    const { id } = req.params;
    try {
        const tracks = [];
        const track = await Track.findById(id);
        const album = await Album.findById(track.album_id);
        const albums = [];
        if (album.genres.length < 1) {
            albums = await Album.find({$or: [{ genres: { $regex: album.genres[0]}}, { genres: {$regex: album.genres[1]}}]}).where('_id').ne(id).limit(5);
        } else {
            let als = await Album.find({$or: [{ genres: { $regex: album.genres[0]} }]}).where('_id').ne(id).limit(5);
            for (let i = 0; i < als.length; i++) {
                const a = als[i];
                albums.push(a);
            }
        }
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracksAl = await Track.find({'album_id':a._id});
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
            for (let i = 0; i < 1; i++) {
                const t = tracksAl[0];
                if (id != t._id) {
                    tr = {
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
                    tracks.push(tr);
                }
            }
        }
        res.status(200).json({
            tracks: tracks
        });
    } catch (error) {
        next(error)
    }
}

module.exports = suggestionsCtrl