const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema
({
    title : String,
    source : String,
    album_id : {type: Schema.Types.ObjectId, ref:'album'},
    artist_id : {type: Schema.Types.ObjectId, ref:'artist'},
    playcount : Number,
    track_number : Number,
    duration_ms : Number,
})
module.exports = mongoose.model('track', trackSchema );