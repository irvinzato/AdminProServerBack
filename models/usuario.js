const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

//PARA MODIFICAR MI JSON QUE RESPONDERE EN LA PETICION
UsuarioSchema.method('toJSON', function() {
    //Todo lo que esta entre { } es lo que quito, para no enviarlo como respuesta
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );