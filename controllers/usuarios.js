const { response } = require('express');
const { validationResult } = require('express-validator');//Como modularice mi aplicacion, esto lo pase a su middleware
const bcrypt = require('bcryptjs'); //"npm i bcryptjs" pasa hacer uso de libreria(encripta contraseñas)
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    //De esta manera saco el valor de la url y si no viene que tome 0
    const desde = Number(req.query.desde) || 0;

    //Con "skip" le digo que se salte los primeros "desde" y da ese registro en adelante
    //con "limit" le digo el limite de registros a mostrar, podria recibirlo o ponerlo fijo, asi me mostrara registros "desde" hasta mi limite
    const usuarios = await Usuario.find({}, 'nombre email rol google img')
                                  .skip( desde )
                                  .limit( 5 );

    //De esta manera se el total de registros en mi BD "count()" o "countDocuments()"
    const totalRegistros = await Usuario.count();

    /* ESTA ES OTRA MANERA DE EJECUTAR LAS PROMESAS Y DESESTRUCUTRAR LOS VALORES DE CADA UNA EN UN ARREGLO, PUEDE SER MAS EFICIENTE
    const [ usuarios, totalRegistros ] = await Promise.all([
        Usuario.find({}, 'nombre email rol google')
                .skip( desde )
                .limit( 5 ),
        Usuario.count()
    ]); */

    res.json({
        ok: true,
        usuarios,
        totalRegistros,
        msg: 'GET usuarios hecho'
    });
}

const crearUsuarios = async (req, res = response) => {

    const { email, password } = req.body;    

    try {
        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );
        //Encriptado de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        //Guardo usuario
        await usuario.save();

        //Generación del TOKEN - JWT
        const token = await generarJWT( usuario._id );

        res.json({
            ok: true,
            msg: 'Creando Usuario',
            usuario,
            token
        });      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    //VALIDAR TOKEN Y COMPROBAR SI ES EL USUARIO CORRECTO

    //Viene en los parametros de la peticion
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un usuario con ese id'
            });
        }

        //Actualizaciones
        const campos = req.body;
        delete campos.password; //Borro todo lo que no quiero actualizar, por si me mandan el password
        delete campos.google; //Borro todo lo que no quiero actualizar
        if( usuarioDB.email === req.body.email ) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne( { email: req.body.email} );
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        //Si es un usuario de Google no debe poder cambiar el correo
        if( usuarioDB.google && campos.email ) {
            return res.json({
                ok: false,
                msg: 'No se puede actualizar el correo electronico de un usuario de Google'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un usuario con ese id'
            });
        }

        //NORMALMENTE NO VOY A QUERER BORRAR, SOLO DESACTIVAR
        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: 'Usuario eliminado',
            uid
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}