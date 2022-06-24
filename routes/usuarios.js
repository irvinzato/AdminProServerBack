/*
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator'); //"npm i express-validator" para hacer uso de esta importacion
const { validarCampos } = require('../middlewares/validar.campos');
const { getUsuarios, crearUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get( '/', getUsuarios );

router.post( 
    '/', 
    [ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios );

module.exports = router;