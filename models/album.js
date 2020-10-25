const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema
({
    title : String,
    source : String,
    image : String,
    artist_id : String,
    genres : Array,
    release_date : Date,
    playcount : Number,
    total_tracks: Number,
    album_type: String
})
module.exports = mongoose.model('album', albumSchema ); 