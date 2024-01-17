const { Pokemon } = require('../../db')

const deletePokemon = async (req, res) => {
    try {
        const { id } = req.params;

        await Pokemon.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'pokemon eliminado' });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = { deletePokemon };