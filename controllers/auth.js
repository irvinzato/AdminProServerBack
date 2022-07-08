const { response } = require('express');
const bcrypt = require('bcryptjs'); //"npm i bcryptjs" pasa hacer uso de libreria(encripta contraseñas)

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        //Verificacion de email
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo electronico no encontrado'
            });
        }

        //Verificacion de contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        //Generación del TOKEN - JWT
        const token = await generarJWT( usuarioDB._id );

        res.json({
            ok: true,
            msg: 'Todo bien',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, consulta al administrador'
        });
    }
}

const googleLogin = async( req, res = response ) => {

    try {
        /* De esta variable podria desestructurar solo lo que me interesa
        const googleUser = await googleVerify( req.body.token ); */
        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            //Con esto el usuario ya no podria autenticarse con las credenciales normales, depende que queremos hacer
            //usuario.password = '@@';
        }
        //Guardo usuario
        await usuario.save();

        //Generación del TOKEN - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email,
            name,
            picture,
            token,
            msg: 'Login con Google exitoso'
        });
        
    } catch (error) {
        console.log("Error de googleLogin ", error );
        res.status(400).json({
            ok: false,
            msg: 'El Token de Google es correcto '
        });
    }
}

const renewToken = async( req, res = response ) => {
    //Si llega a este punto es por que ya tenemos el "uid"
    const uid = req.uid;

    //Obtengo informacion del usuario
    const usuarioDB = await Usuario.findById( uid );
    //const { nombre, email, rol, img } = usuarioDB;
  
    //Generación del TOKEN - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        uid,
        usuarioDB,
        token,
        msg: 'Verificación de token correcta'
    });

}

module.exports = {
    login,
    googleLogin,
    renewToken
}