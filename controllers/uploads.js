const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); //Para utilizarle instale "npm install uuid"
const { actualizarImagen } = require('../helpers/actualizar-imagen');

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
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //Validar extension
    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];
    
    if( !extensionesValidas.includes(extensionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'La extension no es permitida, debe ser png, jpg, jpeg o gif'
        });
    }

    //Generar el nombre del archivo, de esta manera si los usuarios suben un archivo con el mismo nombre, yo le dare un identificador unico
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path donde guardare la imagen
    const path = `./uploads/${ tipo }/${nombreArchivo}`;

    //Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log("Error al mover imagen ", err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar la imagen en su path'
            });
        }

        //Actualizar base de datos(DB)
        //Lo hago dentro de mis helpers por que este codigo ya crecio mucho
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            nombreArchivo,
            msg: 'Subida de archivo exitosa'
        });
    });
}


const retornaImagen = async (req, res = response) => {

    const tipo = req.params.tipo;
    const imagen = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }` );

    //Para verificar si el path existe
    if( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/imagenNoEncontrada.png` );
        res.sendFile( pathImg );
    }
}


module.exports = {
    subirArchivo,
    retornaImagen
}