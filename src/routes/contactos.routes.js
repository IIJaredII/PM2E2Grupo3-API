const express = require("express");
const router = express.Router();
const contactos = require("../controllers/contactos.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken} = require("../middlewares/authConfig");

router.get("/",contactos.obtenerContacto);
router.get("/:id",contactos.obtenerContactoPorId);
router.post("/",upload.single("video"),contactos.crearContacto);
router.delete("/:id",contactos.eliminarContacto);
router.put("/:id",upload.single("video"), contactos.actualizarContacto);

module.exports = router;