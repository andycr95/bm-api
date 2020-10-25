const searchCtrl = {}
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const moment = require('moment')
moment.locale('es');

searchCtrl.getSearch = async (req, res, next) => {
    const { search } = req.query;
    try {
        const respoAl = [];
        const respoTr = [];
        const respoAr = [];
        const tracks = await Track.find({ title: { $regex : ".*"+ search.toLowerCase() +".*"} }).limit(5);
        const albums = await Album.find({ title: { $regex : ".*"+ search.toLowerCase() +".*"} }).limit(5);
        const artists = await Artist.find({ name: { $regex : ".*"+ search.toLowerCase() +".*"} }).limit(5);
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
                total_tracks: a.total_tracks,
                release_date: a.release_date,
                album_type: moment(a.release_date).format('LL'),
                genres: a.genres,
                artist: artist,
                tracks: okTr
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
                    playcount: a.playcount,
                    followers: a.followers,
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
                    playcount: a.playcount,
                    followers: a.followers,
                }
                const respo = {
                    _id : e._id,
                    title : e.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    image: album.image,
                    playcount : e.playcount,
                    track_number : e.track_number,
                    source : e.source,
                    duration_ms : e.duration_ms,
                    artist,
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

module.exports = searchCtrl