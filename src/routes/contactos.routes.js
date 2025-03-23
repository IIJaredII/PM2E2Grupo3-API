const express = require("express");
const router = express.Router();
const contactos = require("../controllers/contactos.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken} = require("../middlewares/authConfig");

router.get("/",verifyToken,contactos.obtenerContacto);
router.post("/",verifyToken,upload.single(""),contactos.crearContacto);
router.delete("/",verifyToken,upload.single("foto"),contactos.eliminarContacto);
router.put("/", verifyToken,upload.single("foto"), contactos.actualizarContacto);


module.exports = router;