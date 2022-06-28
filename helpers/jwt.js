//Para generar mi jwt utilizo libreria "npm i jsonwebtoken"
const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    //Transformo este proceso en una PROMESA para poder usar async y await
    return new Promise( (resolve, reject) => {
        //En el payload se puede grabar lo que sea pero que no sea informacion sensible
        const payload = {
            uid
        };
        //Primer argumento es mi payload, segundo argumento la firma con la que debe hacer match, la defino en mis variables de entorno
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( error, token ) => {
            if( error ) {
                console.log(error);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT
}