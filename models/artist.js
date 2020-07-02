const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema
({
    name : String,
    image : String,
    genres : Array,
})
module.exports = mongoose.model('artist', artistSchema );