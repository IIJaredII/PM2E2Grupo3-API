const fs = require("fs");
const connection = require("../config/db");


const crearContacto = async (req,res)  => {
    try {
        
        const {nombre,idPais,latitud,longitud} = req.body;
        const video = req.file ? req.file.path.replace(/\\/g, "/") : null;

        if(!nombre || !idPais || !latitud || !longitud || !video) {
            return res.status(0).send()
        }

        const results = await connection.promise.query(
            "CALL insertContacto(?,?,?,?,?)",
            [nombre,idPais,latitud,longitud,video]
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

const eliminarContacto = async (req,res) => {
    try{
        const {id} = req.body;
        await connection.promise().query("CALL eliminarContacto(?)",[id]);
        res.json({mensaje: "Contacto eliminado correctamente"});

    }catch(error){
        console.error("Error al eliminar contacto: ",error);
        res.status(500).json({mensaje: "Error al eliminar contacto"});
    }
};


const actualizarContacto = async(req,res) => {
    try{
        
        const {id,nombre,idpais,latitud,longitud} = req.body;
        const nuevoVideo = req.file ? req.file.path : null;

        const [contacto] = await connection.promise().query("SELECT video_contacto FROM contactos WHERE id=?",[id]);

        if(contacto.length === 0){
            return res.status(404).json({mensaje: "Contacto no encontrado"});
        }

        const videoActual = contacto[0].video_contacto;

        if(nuevoVideo && videoActual){
            if(fs.existsSync(videoActual)){
                fs.unlinkSync(videoActual);
            }
        }

        await connection.promise().query(
            "CALL actualizarContacto(?,?,?,?,?,?)",
            [id,nombre,idpais,latitud,longitud,nuevoVideo]
        );

        res.json({mensaje: "Contacto actualizado exitosamente"});

    }catch(error){
        console.error("Error al actualizar contacto: ",error);
        res.status(500).json({mensaje: "Error al actualizar contacto"});
    };

    


}

module.exports = {
    crearContacto,
    obtenerContacto,
    eliminarContacto,
    actualizarContacto
};
