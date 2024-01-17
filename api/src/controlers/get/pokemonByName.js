const axios = require("axios");
const { formatMyPokemon, formatSinglePokemon } = require("../funcionesParaControllers");
const { Pokemon, Type } = require("../../db");
const { Op } = require('sequelize');

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon/";

const PokemonByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: `Ingrese un nombre para la consulta.` });
        }

        const lowercaseName = name.toLowerCase();
        let pokemon = await Pokemon.findOne({
            where: { name: { [Op.iLike]: `${name}` } },
            include: [
                {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes: [] },
                }
            ]
        });

        if (pokemon) {
            const formattedPokemon = formatMyPokemon(pokemon);
            return res.status(200).json(formattedPokemon);
        }

        const { data } = await axios(`${POKE_API_URL}${lowercaseName}`);

        if (!data) {
            return res.status(404).json({ message: `No existe un Pokémon llamado ${name}` });
        }

        pokemon = formatSinglePokemon(data);
        return res.status(200).json(pokemon);
    } catch (error) {
        console.error("Error en PokemonByName:", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar la solicitud" });
    }
};

module.exports = {
    PokemonByName,
};