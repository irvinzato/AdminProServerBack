require('dotenv').config(); //instalacion "npm i dotenv"

const express = require('express');
const cors = require('cors'); //instalacion "npm i cors"

const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use( cors() );

//Base de datos
dbConnection();

//Aqui muestro todas las variables de entorno existentes y se conecta a mi .env (ocupa la instalacion de dotenv)
//console.log( process.env );

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto ", process.env.PORT);
});