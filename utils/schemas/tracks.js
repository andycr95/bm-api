const joi = require('@hapi/joi');
const { ObjectId } = require('mongodb')

const trackIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const trackTitleSchema = joi.string().max(80);
const trackSourceSchema = joi.string().uri();
const trackPlaycountSchema = joi.number();
const trackArtistIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const trackAlbumIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const trackTrackNumberSchema = joi.number();
const trackDurationSchema = joi.number();

const createTrackSchema = {
    title: trackTitleSchema.required(),
    source: trackSourceSchema.required(),
    album_id: trackArtistIdSchema,
    artist_id: trackAlbumIdSchema,
    playcount: trackPlaycountSchema,
    track_number: trackTrackNumberSchema,
    duration_ms: trackDurationSchema
};

const updateTrackSchema = {
    title: trackTitleSchema,
    source: trackSourceSchema,
    album_id: trackArtistIdSchema,
    artist_id: trackAlbumIdSchema,
    playcount: trackPlaycountSchema,
    track_number: trackTrackNumberSchema,
    duration_ms: trackDurationSchema
};

module.exports = {
    trackIdSchema,
    createTrackSchema,
    updateTrackSchema
}