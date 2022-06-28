const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {

    try {              
        const medicos = await Medico.find() //Con el populate puedo obtener mas campos para esa variable
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medicos,
            msg: 'Petición exitosa'
        });
    } catch (error) {
        console.log("Error en getMedicos ", error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    
    const medico = await new Medico( { usuario:uid, ...req.body} );
    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB,
            msg: 'Creado de medico exitoso'
        });
        
    } catch (error) {
        console.log("Error en POST crearMedico ", error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, habla con el administrador'
        });
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    });
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}