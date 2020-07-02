const express = require('express');
var moment = require('moment');
const Track = require('../models/track')
const Album = require('../models/album')
const Artist = require('../models/artist')
const Playlist = require('../models/playlist')

function admin(app) { 
    const router = new express.Router();
    app.use('/admin', router)

    router.get('/', async function (req, res, next) {
        tracks = await Track.find();
        playlists = await Playlist.find();
        albums = await Album.find();
        res.status(200).render('admin/index', { tracks: tracks, albums: albums, playlists: playlists});
    });

    router.get('/playlists', async function (req, res, next) {
        tracks = await Track.find();
        playlists = await Playlist.find();
        res.status(200).render('admin/playlist', { tracks: tracks, playlists: playlists, title: 'Playlists'});
    });

    router.get('/tracks', async function (req, res, next) {
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
                source : e.source,
                playcount : e.playcount,
                track_number : e.track_number,
                duration_ms : e.duration_ms,
                artist,
                album
            }
            okTracks.push(respo);
        }
        res.status(200).render('admin/tracks', { tracks: okTracks, title: 'Tracks'});
    });

    router.get('/Albums', async function (req, res, next) {
        const okAlbums = [];
        const albums = await Album.find();
        for (let i = 0; i < albums.length; i++) {
            const a = albums[i];
            const tracks = await Track.find({'album_id':a._id});
            const artist = await Artist.findById(a.artist_id);
            const album = {
                genres: a.genres,
                _id: a._id,
                album_type: a.album_type,
                image: a.image,
                title: a.title,
                release_date: a.release_date,
                total_tracks: a.total_tracks,
                artist: artist,
                tracks
            }
            okAlbums.push(album);
        }
        res.status(200).render('admin/albums', { albums: okAlbums, moment: moment, title: 'Albumnes'});
    });

    router.get('/artists', async function (req, res, next) {
        const okArtists = [];
        const artists = await Artist.find();
        for (let i = 0; i < artists.length; i++) {
            const a = artists[i];
            const tracks = await Track.find({'artist_id':a._id}).count();
            const albums = await Album.find({'artist_id':a._id}).count();
            const artist = {
                genres: a.genres,
                _id: a._id,
                name: a.name,
                image: a.image,
                albums,
                tracks
            }
            okArtists.push(artist);
        }
        res.status(200).render('admin/artists', { artists: okArtists, title: 'Artistas'});
    });


 }

module.exports = admin;