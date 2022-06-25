const { response } = require('express');
const bcrypt = require('bcryptjs'); //"npm i bcryptjs" pasa hacer uso de libreria(encripta contraseñas)

const Usuario = require('../models/usuario');

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

        res.json({
            ok: true,
            msg: 'Todo bien'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, consulta al administrador'
        });
    }
}

module.exports = {
    login
}