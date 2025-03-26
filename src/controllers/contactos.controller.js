const fs = require("fs");
const path = require("path");
const connection = require("../config/db");


const crearContacto = async (req,res)  => {
    try {

        const {nombre,idPais,latitud,longitud,telefono} = req.body;
        const video = req.file ? path.basename(req.file.path) : null;

        if(!nombre || !idPais || !telefono || !latitud || !longitud || !video) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const results = await connection.promise().query(
            "CALL insertarContactos(?,?,?,?,?,?)",
            [nombre,idPais,telefono,latitud,longitud,video]
        );

        res.status(201).json({
            mensaje: "Contacto agregado correctamente",
            id: results.insertId
        });

    } catch (error) {
        console.error("Error al crear contacto:", error);

                if (req.file) {
                    try {
                        fs.unlinkSync(req.file.path);
                        console.log("Video eliminada debido a un error en la BD.");
                    } catch (unlinkError) {
                        console.error("Error al eliminar el video:", unlinkError);
                    }
                }

                res.status(500).json({ mensaje: "Error al crear el contacto" });
    }
};

const obtenerContacto = async (req, res) => {
    try {
        const [results] = await connection.promise().query('CALL obtenerContactos()');

        res.json(results[0]); 
    }catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({ mensaje: "Error al obtener contactos" });
    }
}

const obtenerContactoPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const [results] = await connection.promise().query('CALL obtenerContactoPorId(?)',[id]);

        if (results.length === 0) {
            res.status(404).json({ mensaje: "No se encontro ese contacto" });
        }else{
            res.json(results[0]); 
        }

    }catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({ mensaje: "Error al obtener contactos" });
    }
}

const obtenerContactoPorNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        const [results] = await connection.promise().query(
            "SELECT id, nombre, codigo, telefono, longitud, latitud FROM contactos WHERE nombre LIKE CONCAT('%', ?, '%')"
            ,[nombre]);

        if (results.length === 0) {
            res.status(404).json({ mensaje: "No se encontro ese contacto" });
        }else{
            res.json(results[0]); 
        }

    }catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({ mensaje: "Error al obtener contactos" });
    }
}

const eliminarContacto = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await connection.promise().query(
            "SELECT videoContacto FROM contactos WHERE id=?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ mensaje: "Contacto no encontrado" });
        }

        const videoNombre = rows[0].videoContacto;

        await connection.promise().query("CALL eliminarContacto(?)", [id]);

        const videoPath = path.join(__dirname, "../../datos/", videoNombre);
        if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        }

        res.json({ mensaje: "Contacto eliminado correctamente" });

    } catch (error) {
        console.error("Error al eliminar contacto: ", error);
        res.status(500).json({ mensaje: "Error al eliminar contacto" });
    }
};




const actualizarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, idPais, latitud, longitud, telefono } = req.body;
        const nuevoVideo = req.file ? path.basename(req.file.path) : null; 

        const [contacto] = await connection.promise().query(
            "SELECT videoContacto FROM contactos WHERE id=?", 
            [id]
        );

        if (contacto.length === 0) {
            return res.status(404).json({ mensaje: "Contacto no encontrado" });
        }

        const videoActual = contacto[0].videoContacto;

        if (nuevoVideo && videoActual) {
            const videoPath = path.join(__dirname, "../../datos/", videoActual);
            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }
        }

        await connection.promise().query(
            "CALL actualizarContacto(?,?,?,?,?,?,?)",
            [id, nombre, idPais, telefono, latitud, longitud, nuevoVideo || videoActual]
        );

        res.json({ mensaje: "Contacto actualizado exitosamente" });

    } catch (error) {
        console.error("Error al actualizar contacto: ", error);
        res.status(500).json({ mensaje: "Error al actualizar contacto" });
    }
};


module.exports = {
    crearContacto,
    obtenerContacto,
    eliminarContacto,
    actualizarContacto,
    obtenerContactoPorId,
    obtenerContactoPorNombre
};