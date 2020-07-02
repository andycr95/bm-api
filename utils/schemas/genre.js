const joi = require('@hapi/joi');

const genreNameSchema = joi.string();
const genreIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createGenreSchema = {
    name: genreNameSchema.required()
};

const updateGenreSchema = {
    name: genreNameSchema,
};

module.exports = {
    genreIdSchema,
    createGenreSchema,
    updateGenreSchema
}