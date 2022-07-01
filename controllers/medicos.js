const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


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

const actualizarMedico = async (req, res = response) => {
    //Rescato todas las variables que me pueden servir de mis request
    const medicoId = req.params.id;
    const uid = req.uid;
    const hid = req.body.hospital;

    try {

        const medicoDB = await Medico.findById( medicoId );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro medico con dicho id'
            });
        }

        const hospitalDB = await Hospital.findById( hid );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro hospital con dicho id'
            });
        }

        //Ya confirme que existe tanto el medico como el hospital, ahora puedo actualizar
        medicoDB.nombre = req.body.nombre;
        medicoDB.hospital = hid;

        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, medicoDB, {new: true} );

        res.json({
            ok: true,
            medicoActualizado,
            medicoId,
            uid,
            msg: 'actualizarMedicos'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado en actualizar medico, hable con el administrador'
        });
    }

}

const borrarMedico = async (req, res = response) => {

    const medicoId = req.params.id;

    try {

        const medicoDB = await Medico.findById( medicoId );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro medico con dicho id'
            });
        }

        await Medico.findByIdAndDelete( medicoId );
        
        res.json({
            ok: true,
            medicoId,
            msg: 'Medico borrado'
        });
    } catch (error) {
        console.log("Error al borrar medico ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar medico, consulta al adimistrador'
        });
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}