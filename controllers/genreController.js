const genreCtrl = {}
const Genre = require('../models/genre')

genreCtrl.getGenres = async (req, res, next) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        next(error)
    }
}

genreCtrl.getGenre = async (req, res, next) => {
    const { id } = req.params;
    try {
        const genre = await genre.findById(id);
        res.status(200).json(genre);
    } catch (error) {
        next(error)
    }
}

genreCtrl.createGenre = async (req, res) => {
    const { body: genre } = req
    try {
        const art = new Genre({
            name: genre.name,
        })
        const id = await art.save()
        res.status(201).json({
            genre: id,
            message: 'Genre created'
        })
    } catch (error) {
        next(error)
    }
}

genreCtrl.updateGenre = async (req, res) => {
    const { id } = req.params
    const genre = {
        name: req.body.name
    }
    await Genre.findByIdAndUpdate(id, { $set: genre }, { new: true })
    res.json({
        status: 'Genre updated'
    })
}

genreCtrl.deleteGenre = async (req, res) => {
    await Genre.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Genre deleted'
    })
}

module.exports = genreCtrl