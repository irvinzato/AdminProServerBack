/*
    RUTA: /api/upload
*/
const { Router } = require('express');
const fileUpload = require('express-fileupload'); //Para ocuparlo se usa ""npm i express-fileupload""

const { validarJWT } = require('../middlewares/validar-jwt');
const { subirArchivo, retornaImagen } = require('../controllers/uploads');


const router = Router();

//Viene en la documentacion de "https://www.npmjs.com/package/express-fileupload" en "Basic File Upload"
router.use(fileUpload());

router.put( '/:tipo/:id', 
    [ 
        validarJWT
    ],
    subirArchivo
);

router.get( '/:tipo/:foto', 
    [ 
      
    ],
    retornaImagen
);

module.exports = router;