const express = require("express");
const router = express.Router();
const contactos = require("../controllers/contactos.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken} = require("../middlewares/authConfig");

router.get("/",verifyToken,contactos.obtenerContacto);
router.get("/id",verifyToken,contactos.obtenerContactoPorId);
router.post("/",verifyToken,upload.single("video"),contactos.crearContacto);
router.delete("/",verifyToken,upload.single("video"),contactos.eliminarContacto);
router.put("/", verifyToken,upload.single("video"), contactos.actualizarContacto);

module.exports = router;