const mongoose = require("mongoose");
//user: angular_avanzado
//passwoard: oFZpdO7RUM1Y6aiE
const dbConnection = async () => {
    
    try {
        await mongoose.connect( 'mongodb+srv://angular_avanzado:oFZpdO7RUM1Y6aiE@cluster0.wrj2u.mongodb.net/hospitaldb', {

        });
        console.log("DB Online");
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD ver Logs');
    }
}

module.exports = {
    dbConnection
}