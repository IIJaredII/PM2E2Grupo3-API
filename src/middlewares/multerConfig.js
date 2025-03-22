const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../datos/videos"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, "perfil_" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /mp4/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error("Solo se permiten Videos"));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
