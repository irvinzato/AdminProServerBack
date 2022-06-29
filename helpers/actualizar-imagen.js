const fs = require('fs');
const Usuario  = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico   = require('../models/medico');


const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    
    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ) {
                console.log('El medico no existe con tal id');
                return false;
            }
            const pathViejo = `./uploads/medicos/${ medico.img }`;
            if( fs.existsSync(  pathViejo ) ) {
                //Para borrar la imagen anterior
                fs.unlinkSync( pathViejo );
            }
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            
        break;

        case 'usuarios':
            
        break;
    }

}



module.exports = {
    actualizarImagen
}