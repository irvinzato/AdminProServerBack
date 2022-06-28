const { response } = require('express');

//En mi carpeta "uploads" es donde colocare la imagen respectivamente
//Utilice instalar en mi proyecto "npm i express-fileupload"


const subirArchivo = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];

    if( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital(tipo)'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar la imagen

    res.json({
        ok: true,
        mmsg: 'Subida de archivo exitosa'
    });


}


module.exports = {
    subirArchivo
}