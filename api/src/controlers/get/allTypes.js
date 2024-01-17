const axios = require("axios")
const { Type } = require("../../db")
const allTypes = async (req, res) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/`);

        if (!data.results) return res.status(404).json({ message: 'No se recibe la info requerida' });
        const typesMap = data.results.map(({ name }) => {
            return {
                name
            };
        });
        const allType = await Promise.all(typesMap.map(async (type) => {
            const [savedType, created] = await Type.findOrCreate({
                where: { name: type.name } //creo una instancia para cada type
            });
            return savedType; //busco/guardo y devuelvo.
        }))

        return res.status(200).json(allType);

    } catch (error) {
        console.error("Error en la función allTypes:", error);
        return res.status(500).json({ error: "Error interno del servidor" })
    }
};

module.exports = {
    allTypes,
};