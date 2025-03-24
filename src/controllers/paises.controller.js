const connection = require("../config/db");


const obtenerPaises = async (req, res) => {
    try {
        const [results] = await connection.promise().query('CALL obtenerPaises()');

        res.json(results[0]); 
    }catch (error) {
        console.error("Error al obtener paises:", error);
        res.status(500).json({ mensaje: "Error al obtener paises" });
    }
}

module.exports = {obtenerPaises}