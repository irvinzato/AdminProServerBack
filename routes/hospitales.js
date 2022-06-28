/*
    RUTA: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator'); //"npm i express-validator" para hacer uso de esta importacion
const { validarCampos } = require('../middlewares/validar.campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

router.get( '/', 
    [ 
        
    ],
    getHospitales 
);

router.post( 
    '/', 
    [ 
        
    ],
    crearHospital
);

 router.put( '/:id', 
    [
        
    ],
    actualizarHospital
 );

 router.delete( '/:id',
    [
        
    ],
    borrarHospital
);

module.exports = router;