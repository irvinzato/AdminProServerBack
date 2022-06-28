const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, { collection: 'medicos' }); //Asi no se creara mi BD como "Hospitals", sera "hospitales"

//PARA MODIFICAR MI JSON QUE RESPONDERE EN LA PETICION
MedicoSchema.method('toJSON', function() {
    //Todo lo que esta entre { } es lo que quito, para no enviarlo como respuesta
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Medico', MedicoSchema );