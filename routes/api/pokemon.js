const express = require('express');
const pokemonController  = require('../../controllers/pokemonController');

function albumApi(app) { 
    const router = new express.Router();
    app.use('/api/pokemon', router)

    router.get('/', pokemonController.getPokemons);
    router.get('/:id', pokemonController.getPokemon);
    router.put('/:id', pokemonController.updatePokemon);
    router.delete('/:id', pokemonController.deletePokemon);
    router.post('/', pokemonController.createPokemon);
 }

module.exports = albumApi;
