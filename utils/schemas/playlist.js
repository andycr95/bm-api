const joi = require('@hapi/joi');

const playlistIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const playlistTitleSchema = joi.string().max(80)
const playlistImageSchema = joi.string().uri();
const playlistBackImageSchema = joi.string().uri();
const playlistDescSchema = joi.string();
const playlistTracksSchema = joi.array().items(joi.object());
const playlistPublicSchema = joi.bool();

const createplaylistSchema = {
    title: playlistTitleSchema.required(),
    image: playlistImageSchema,
    back_image: playlistBackImageSchema,
    description: playlistDescSchema,
    tracks: playlistTracksSchema,
    public: playlistPublicSchema,
};

const updateplaylistSchema = {
    title: playlistTitleSchema,
    image: playlistImageSchema,
    back_image: playlistBackImageSchema,
    description: playlistDescSchema,
    tracks: playlistTracksSchema,
    public: playlistPublicSchema,
};

module.exports = {
    playlistIdSchema,
    createplaylistSchema,
    updateplaylistSchema
}