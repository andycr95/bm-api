const pokeCtrl = {}
const Pokemon = require('../models/pokemon')

pokeCtrl.getPokemons = async (req, res, next) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        next(error);
    }
}

pokeCtrl.getPokemon = async (req, res, next) => {
    const { id } = req.params;
    try {
        const pokemon = await Pokemon.findById(id);
        res.status(200).json(pokemon);
    } catch (error) {
        next(error)
    }
}

pokeCtrl.createPokemon = async (req, res) => {
    const { body: pokemon } = req
    try {
        const pk = new Pokemon({
            name: pokemon.name,
            height: pokemon.height,
            base_experience: pokemon.base_experience,
            order: pokemon.order,
            width: pokemon.width,
            type: pokemon.type
        })
        await pk.save()
        res.status(201).json({
            success: true,
            message: 'Pokemon created'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

pokeCtrl.updatePokemon = async (req, res) => {
    const { id } = req.params
    const { body: pokemon } = req
    try {
        const pk = {
            name: pokemon.name,
            height: pokemon.height,
            base_experience: pokemon.base_experience,
            order: pokemon.order,
            width: pokemon.width,
            type: pokemon.type
        }
        await Pokemon.findByIdAndUpdate(id, { $set: pk }, { new: true })
        res.status(200).json({
            success: true,
            message: 'Pokemon updated'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

pokeCtrl.deletePokemon = async (req, res) => {
    const { id } = req.params
    try {
        await Pokemon.findByIdAndRemove(id)
        res.status(200).json({
            success: true,
            message: 'Pokemon deleted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

module.exports = pokeCtrl



// pokeCtrl.getAlbums = async (req, res, next) => {
//     const resPerPage = 5; // results per page
//     const page = req.query.page || 1; // Page 
    // try {
    //     const searchQuery = req.query.search,
    //     regex = new RegExp(escapeRegex(req.query.search), 'gi');
    //     const respo = [];
    //     const albums = await Album.find({title:regex}).skip((resPerPage * page) - resPerPage)
    //     .limit(resPerPage).sort({'_id': -1});
    //     const num = await Album.count({title: regex});
    //     for (let i = 0; i < albums.length; i++) {
    //         const a = albums[i];
    //         const tracks = await Track.find({'album_id':a._id}).sort('track_number');
    //         const art = await Artist.findById(a.artist_id);
    //         const okTr = [];
    //         const artist = {
    //             _id: art._id,
    //             name: art.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
    //             image: art.image,
    //             playcount: art.playcount,
    //             followers: art.followers,
    //             genres: art.genres
    //         }
    //         for (let i = 0; i < tracks.length; i++) {
    //             const t = tracks[i];
    //             track = {
    //                 _id : t._id,
    //                 title : t.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
    //                 image : a.image,
    //                 source : t.source,
    //                 playcount : t.playcount,
    //                 track_number : t.track_number,
    //                 duration_ms : t.duration_ms,
    //                 artist: artist,
    //                 album: a
    //             }
    //             okTr.push(track);
    //         }
    //         const album = {
    //             _id: a._id,
    //             title: a.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
    //             image: a.image,
    //             artist: artist,
    //             total_tracks: a.total_tracks,
    //             release_date: moment(a.release_date).format('LL'),
    //             album_type: a.album_type,
    //             tracks: okTr,
    //             genres: a.genres
    //         }
    //         respo.push(album);
    //     }
    //     res.status(200).json({
    //         data: respo,
    //         total: num,
    //         limit: resPerPage,
    //         totalPages: Math.ceil(num / resPerPage),
    //         page: page,
    //         searchVal: searchQuery
    //     });
    // } catch (error) {
    //     next(error)
    // }
// } */

