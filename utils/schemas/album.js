const joi = require('@hapi/joi');

const albumIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const albumTitleSchema = joi.string().max(80)
const albumArtistSchema =joi.string().regex(/^[0-9a-fA-F]{24}$/);
const albumImageSchema = joi.string().uri();
const albumGenresSchema = joi.array().items(joi.string().max(50));
const albumReleaseDateSchema = joi.date();
const albumTotalTracksSchema = joi.number().min(1);
const albumTypeSchema = joi.string();

const createAlbumSchema = {
    title: albumTitleSchema.required(),
    image: albumImageSchema,
    artist_id: albumArtistSchema.required(),
    genres: albumGenresSchema,
    release_date: albumReleaseDateSchema,
    total_tracks: albumTotalTracksSchema,
    album_type: albumTypeSchema
};

const updateAlbumSchema = {
    title: albumTitleSchema,
    image: albumImageSchema,
    artist_id: albumArtistSchema,
    genres: albumGenresSchema,
    release_date: albumReleaseDateSchema,
    total_tracks: albumTotalTracksSchema,
    album_type: albumTypeSchema
};

module.exports = {
    albumIdSchema,
    createAlbumSchema,
    updateAlbumSchema
}