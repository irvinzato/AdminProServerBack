/*
    RUTA: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator'); //"npm i express-validator" para hacer uso de esta importacion
const { validarCampos } = require('../middlewares/validar.campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');


const router = Router();

router.get( '/', 
    [ 
        
    ],
    getMedicos
);

router.post( 
    '/', 
    [ 
        
    ],
    crearMedico
);

 router.put( '/:id', 
    [
        
    ],
    actualizarMedico
 );

 router.delete( '/:id',
    [
        
    ],
    borrarMedico
);

module.exports = router;