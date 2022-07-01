const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img');  //De esta manera en el campo "usuario" obtengo ademas del id, el nombre de quien lo creo y puedo añadir los campos que quiera

    res.json({
        ok: true,
        hospitales,
        msg: 'Petición correcta'
    });
}

const crearHospital = async (req, res = response) => {

    //Como ya paso por mis middlewares yo puedo extraer el id del usuario de mi token
    const uid = req.uid;
    const hospital = new Hospital( { usuario:uid, ...req.body} );
    
    try {

        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB,
            msg: 'creado de hospital exitoso'
        });
    } catch (error) {
        console.log("Error en Post Hospitales ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }

}

const actualizarHospital = async (req, res = response) => {
    //obtengo el ID que traigo en la url de la peticion
    const hospitalId = req.params.id;
    //Esta "req.uid" la obtuve de mi "validar-jwt", por ello puedo rescatar el id del usuario
    const uid = req.uid;

    try {
        
        const hospitalDB = await Hospital.findById(hospitalId);

        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro hospital con ese id en la base de datos'
            });
        }
        
        //En este punto si encontre hospital asi que actualizo valores
        //Esta solucion se ve bien cuando se actualiza un valor pero si queremos actualizar mas queda mejor el siguiente comentario
        hospitalDB.nombre = req.body.nombre;

        /*Esta es otra manera de obtener todos los valores que vienen en la "req.body" y almacenar los cambios
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }       
        */

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, hospitalDB, {new: true} );

        res.json({
            ok: true,
            hospitalId,
            uid,
            hospitalActualizado,
            msg: 'actualizarHospitales'
        });

    } catch (error) {
        console.log("Error al actualizar hospital ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar hospital, hable con el administrador'
        });
    }
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}