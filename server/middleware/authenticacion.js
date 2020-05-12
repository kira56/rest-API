const jwt = require('jsonwebtoken')
// ===============================
// Verificar token
// ===============================
module.exports.verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// ===============================
// Verificar AdminRole
// ===============================
module.exports.verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if(usuario.role === "ADMIN_ROLE"){
        next()
    }else{
        return res.json({
            ok:false,
            err:{
                message:'El Usuario no es administrador'
            }
        })
    }

    // if (usuario !='ADMIN_ROLE') {
    //     return res.status(400).json({
    //         ok: false,
    //         err: {
    //             message: 'Se quiere ser Administrador para crear usuarios'
    //         }
    //     })
    // }
    // req.usuario = usuario;
    // next();


}



