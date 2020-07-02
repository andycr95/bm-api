const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema
({
    title : String,
    description : String,
    image : String,
    back_image : String,
    tracks : Array,
    public: Boolean,
})
module.exports = mongoose.model('playlist', playlistSchema );