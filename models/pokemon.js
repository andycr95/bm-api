const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const pokemonSchema = new mongoose.Schema
({
    name: String,
    height: Number,
    base_experience: Number,
    order: Number,
    width: Number,
    type: String
})
module.exports = mongoose.model('pokemon', pokemonSchema ); 