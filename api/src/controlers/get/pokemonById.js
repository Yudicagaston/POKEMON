const axios = require("axios");
const { Pokemon, Type } = require("../../db");
const { formatMyPokemon, formatSinglePokemon } = require("../funcionesParaControllers");

const PokemonById = async (req, res) => {
    const { id } = req.params;
    const { isFromAPI } = req.query; //se a donde buscar.

    try {
        let pokemon;
        if (isFromAPI == "true") {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
            pokemon = formatSinglePokemon(data);
        } else {
            const dataDB = await Pokemon.findOne({
                where: { id },
                include: [ //que incluya esta asociación en particular al recuperar el registro.
                    {
                        model: Type,
                        attributes: ["name"],
                        through: { attributes: [] },
                    }
                ]
            });

            pokemon = formatMyPokemon(dataDB);
        }


        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = { PokemonById };
