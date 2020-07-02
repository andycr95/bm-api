/* const MongoLib = require('../lib/mongo');

class TracksService { 

    constructor() {
        this.collection = 'tracks'
        this.mongodb = new MongoLib();
    }

    async getTracks({ tags }) {
        const query = tags && { tags: { $in: tags }}
        const tracks = await this.mongodb.getAll(this.collection, query);
        return tracks || [];
    }

    async getTrack({ id }) {
        const track = await this.mongodb.get(this.collection, id);
        return track || {};
    }

    async CreateTracks({ track }) {
        const createdTrack = await this.mongodb.create(this.collection, track);
        return createdTrack
    }

    async UpdateTrack({ id, track } = {}) {
        const updatedTrack = await this.mongodb.update(this.collection, id, track);
        return updatedTrack
    }

    async DeleteteTrack({ id }) {
        const deletedTrack = await this.mongodb.delete(this.collection, id);
        return deletedTrack;
    }
 }

 module.exports = TracksService; */