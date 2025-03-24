const express = require("express");
const router = express.Router();
const paises = require("../controllers/paises.controller");

router.get("/", paises.obtenerPaises);

module.exports = router;