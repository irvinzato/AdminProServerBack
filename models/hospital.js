const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' }); //Asi no se creara mi BD como "Hospitals", sera "hospitales"

//PARA MODIFICAR MI JSON QUE RESPONDERE EN LA PETICION
HospitalSchema.method('toJSON', function() {
    //Todo lo que esta entre { } es lo que quito, para no enviarlo como respuesta
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );