/*
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator'); //"npm i express-validator" para hacer uso de esta importacion
const { validarCampos } = require('../middlewares/validar.campos');
const { getUsuarios, crearUsuarios, actualizarUsuario } = require('../controllers/usuarios');

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
    crearUsuarios 
);

 router.put( '/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
    ],
    actualizarUsuario 
 );

module.exports = router;