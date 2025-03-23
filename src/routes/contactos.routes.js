const express = require("express");
const router = express.Router();
const contactos = require("../controllers/contactos.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken} = require("../middlewares/authConfig");

router.get("/",verifyToken,contactos.obtenerContacto);
router.post("/",verifyToken,upload.single(""),contactos.crearContacto);
router.delete("", );
router.put("", );

module.exports = router;