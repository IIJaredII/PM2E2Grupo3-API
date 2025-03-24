const express = require("express");
const router = express.Router();
const path = require("path");
const authRoutes = require("./auth.routes");
const contactoRoutes = require("./contactos.routes");
const paisesRoutes = require("./paises.routes");

router.use("/auth",authRoutes);
router.use("/contactos",contactoRoutes);
router.use("/paises",paisesRoutes);
router.use("/videos", express.static(path.join(__dirname, "../../datos")));

router.use("/", (req, res) => {
    res.status(200).send("OK");
});

module.exports = router;