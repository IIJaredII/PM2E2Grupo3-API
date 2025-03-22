const express = require("express");
const router = express.Router();
const contactos = require("../controllers/contactos.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.get("", );
router.post("", );
router.delete("", );
router.put("", );

module.exports = router;