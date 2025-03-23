const app = require("./app"); 
require("dotenv").config({path: "../.env"});

const PORT = process.env.PORT || 3000;
const HOST = process.env.IP_HOST;
app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});