const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const contactoRoutes = require("./contactos.routes");

router.use("/auth",authRoutes);
router.use("/contactos",contactoRoutes);

module.exports = router;