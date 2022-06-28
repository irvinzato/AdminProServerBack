const { response } = require('express');


const getMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getMedicos'
    });
}

const crearMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearMedicos'
    });
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