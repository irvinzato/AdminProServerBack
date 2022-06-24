const { response } = require('express');
const { validationResult } = require('express-validator');//"npm i express-validator" para hacer uso de esta importacion

const validarCampos = (req, res = response, next) => {
    const errores = validationResult( req );
    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampos
}