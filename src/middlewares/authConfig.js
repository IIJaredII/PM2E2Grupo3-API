require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Token requerido" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ error: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET no está definido en el archivo .env.");
        return res.status(500).json({ error: "JWT_SECRET no está definido en el archivo .env." });
    }

    if (!user || !user.id) {
        console.error("El usuario no tiene un ID válido.");
        return res.status(400).json({ error: "El usuario no tiene un ID válido." });
    }

    console.log("Generando token para: ", { id: user.id });

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return token;
};


module.exports = { verifyToken, checkRole, generateToken };