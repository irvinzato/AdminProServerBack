const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer token(Viene en la request, especificamente en los headers)
    const token = req.header('x-token');
    console.log("En el header trae el x-token ", token);
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No se encontro token en la petición'
        });
    }
    //Verificar token
    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        console.log(uid);
        //Hasta este punto todo esta bien, puedo establecer informacion en la request
        //Lo hago para poder mostrarlo en la respuesta de mi controlador, asi tengo acceso a esa variable
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }
}

module.exports = {
    validarJWT
}