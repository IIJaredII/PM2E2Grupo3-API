const connection = require("../config/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verificarUsuario = async (req, res) => {
    try {
        const{identificador,contrasena}= req.body;

        const [results] = await connection.promise().query(
            "CALL autorizar(?)",
            [identificador]
        );

        console.log("Identificador",identificador);
        console.log("Contraseña",results[0]);

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Correo o contraseña incorrecto" });
        }

        const user = results[0][0];

        if(user.contrasena === contrasena) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, "Secreto", { expiresIn: "1h" });
            res.json({ token });
        }else{
            res.status(404).json({ mensaje: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error("Error al autentificar cliente:", error);
        res.status(500).json({ mensaje: "Error al autentificar cliente" });
    }
}

module.exports = {verificarUsuario}