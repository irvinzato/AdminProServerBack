const { response } = require('express');
const bcrypt = require('bcryptjs'); //"npm i bcryptjs" pasa hacer uso de libreria(encripta contraseñas)

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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

    res.json({
        ok: true,
        msg: 'La peticion trae en body ' + req.body.token
    });

}

module.exports = {
    login,
    googleLogin
}