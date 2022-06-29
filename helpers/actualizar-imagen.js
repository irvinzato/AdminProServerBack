const fs = require('fs');
const Usuario  = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico   = require('../models/medico');


const borrarImagen = ( pathViejo ) => {

        if( fs.existsSync(  pathViejo ) ) {
            //Para borrar la imagen anterior
            fs.unlinkSync( pathViejo );
        }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    
    let pathViejo = '';
    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ) {
                console.log('El medico no existe con tal id');
                return false;
            }
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('El hospital no existe con tal id');
                return false;
            }
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario ) {
                console.log('El usuario no existe con tal id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }

}



module.exports = {
    actualizarImagen
}