const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { AllPokemon } = require('../controlers/get/allPokemons');
const { allTypes } = require('../controlers/get/allTypes');
const { PokemonByName } = require('../controlers/get/pokemonByName');
const { PokemonById } = require('../controlers/get/pokemonById');
const { postPokemon } = require('../controlers/postAndDelete/postPokemon');
const { deletePokemon } = require('../controlers/postAndDelete/deletePokemon');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', AllPokemon);
router.get('/types', allTypes);
router.get('/pokemons/name', PokemonByName);
router.get('/pokemons/:id', PokemonById);
router.post('/pokemons', postPokemon);
router.delete('/pokemons/:id', deletePokemon);
module.exports = router;
