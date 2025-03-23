const fs = require("fs");
const connection = require("../config/db");



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
    eliminarContacto,
    actualizarContacto
};
