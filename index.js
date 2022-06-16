const express = require('express');
require('dotenv').config(); //instalacion "npm i dotenv"

const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Base de datos
dbConnection();

//Aqui muestro todas las variables de entorno existentes y se conecta a mi .env
//console.log( process.env );

//Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola desde el get /'
    });
});

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto ", process.env.PORT);
});