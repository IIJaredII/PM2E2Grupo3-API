const app = require("./app"); 
require("dotenv").config({path: "../.env"});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});