const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwoard: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

//PARA MODIFICAR MI JSON QUE RESPONDERE EN LA PETICION
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );