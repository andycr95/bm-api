const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema
({
    name : String,
    image : String,
    genres : Array,
    followers: Number,
    playcount: Number
})
module.exports = mongoose.model('artist', artistSchema );