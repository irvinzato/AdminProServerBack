/*
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator'); //"npm i express-validator" para hacer uso de esta importacion
const { validarCampos } = require('../middlewares/validar.campos');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
    [ 
        validarJWT 
    ],
    getUsuarios 
);

router.post( '/', 
    [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios 
);

 router.put( '/:id', 
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario 
 );

 router.delete( '/:id',
    [
        validarJWT,
        validarADMIN_ROLE
    ],
    borrarUsuario
);

module.exports = router;