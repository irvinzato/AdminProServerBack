const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

    const nombreBusqueda = req.params.busqueda;
    //Si no le aplico la expresion regular "insensible" seria muy estricta mi busqueda, deberia ser el parametro exactamente igual al que se busca
    const regex = new RegExp( nombreBusqueda, 'i' );

    //De esta manera busco en mis Usuarios por el nombre que viene de parametro "regex"
    /* const usuarios   = await Usuario.find({ nombre: regex });
    const medicos    = await Medico.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex }); */

    //Hace lo mismo que lo de arriba, la diferencia es que es mas eficiente hacerlo de este modo, por que todas las promesas se disparan de forma simultanea
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        nombreBusqueda,
        usuarios,
        medicos,
        hospitales,
        msg:'Get todo'
    });

}

const getColeccionEspecifica = async (req, res = response) => {

    const nombreTabla    = req.params.tabla;
    const nombreBusqueda = req.params.busqueda;
    const regex          = new RegExp( nombreBusqueda, 'i' );

    let data = [];

    switch ( nombreTabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                               .populate( 'usuario', 'nombre img' )
                               .populate( 'hospital', 'nombre img' );
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                 .populate( 'usuario', 'nombre img' );
        break;
        
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser "medicos","hospitales" o "usuarios"'
            });
    }
    res.json({
        ok:true,
        resultados: data,
        nombreTabla,
        nombreBusqueda,
        msj: 'Busqueda especifica por coleccion'
    });
}

module.exports = {
    getTodo,
    getColeccionEspecifica
}