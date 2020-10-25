const userCtrl = {}
const moment = require('moment')
const config = require('../config')
const User = require('../models/user')
moment.locale('es');
const jwt = require('jsonwebtoken')


userCtrl.getUser = async (req, res, next) => {
    const { id } = req.params;
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

userCtrl.signIn = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        res.status(400).json({
            auth: false,
            message: 'Not user found'
        });
    } else {
        // Match password´s user
        const match = await user.matchPassword(password);
        if(match) {
            const token = jwt.sign({id: user._id}, 'shhhhh');
            const us = {
                _id: user._id,
                name: user.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                email: user.email
            }
            res.status(200).json({
                auth: true,
                message: 'User logged',
                user: us,
                token
            });
        } else {
            res.status(400).json({
                auth: false,
                message: 'Incorrect password'
            });
        }
    }
};

userCtrl.currentUser = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    } 
    const decoded = await jwt.verify(token, 'shhhhh');
    const user = await User.findById(decoded.id);
    if (!user) {
        res.status(400).json({
            auth: false,
            message: 'Not user found'
        });
    } else {
        const okUs = {
            _id: user._id,
            name: user.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            email: user.email,
        }
        res.status(200).json({
            auth: true,
            token,
            user: okUs
        });
    }
};

userCtrl.createUser = async (req, res, next) => {
    const { body: user } = req
    const email = await User.findOne({email: user.email});
    if (email) res.status(409).json({error: 'Bad Request', statusCode: 409, message: 'This email is already in use.', });
    else{
        try {
            const us = new User({
                name : user.name,
                email : user.email,
                password : user.password, 
                phoneNumber : user.phoneNumber, 
            });
            us.password = await us.encriptPassword(user.password);
            const resUs = await us.save();
            const okUs = {
                _id: resUs._id,
                name: resUs.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                email: resUs.email,
                phoneNumber : resUs.phoneNumber, 
            }
            const token = jwt.sign({id: resUs._id}, 'shhhhh');
            res.status(201).json({
                message: 'User created',
                user: okUs,
                token
            });
        } catch (error) {
            next(error);
        }
    }
}

userCtrl.updateUser = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

userCtrl.deleteUser = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = userCtrl