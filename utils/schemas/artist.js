const joi = require('@hapi/joi');

const artistIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const artistNameSchema = joi.string().max(80);
const artistImageSchema = joi.string().uri();
const artistGenresSchema = joi.array().items(joi.string().max(50));

const createArtistSchema = {
    name: artistNameSchema.required(),
    image: artistImageSchema,
    genres: artistGenresSchema,
};

const updateArtistSchema = {
    name: artistNameSchema,
    image: artistImageSchema,
    genres: artistGenresSchema,
};

module.exports = {
    artistIdSchema,
    createArtistSchema,
    updateArtistSchema
}