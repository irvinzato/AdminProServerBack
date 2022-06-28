const { response } = require('express');

const getTodo = async (req, res = response) => {

    const nombreBusqueda = req.params.busqueda;

    res.json({
        ok: true,
        nombreBusqueda,
        msg:'Get todo'
    });

}

module.exports = {
    getTodo
}