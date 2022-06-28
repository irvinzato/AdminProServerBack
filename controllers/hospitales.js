const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
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
            msg: 'crearHospitales'
        });
    } catch (error) {
        console.log("Error en Post Hospitales ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }

}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });
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