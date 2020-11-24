const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'ya existe el correo'
            })
        }
        usuario= new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // generar jwt

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Oopps'
        })
    }
}

const loginUser= async(req, res = response ) => {
    const { email, password} = req.body;

    try {
        
        const usuario = await Usuario.findOne({email});


        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El no existe con ese correo'
            })
        }
        
         // confirmar pass
    const validPass = bcrypt.compareSync(password, usuario.password);
     if (!validPass) {
         return res.status(400).json({
             ok:false,
             msg:'pass incorrect'
         })
     }
     // json generado
     const token = await generarJWT(usuario.id, usuario.name);
      console.log('token login: ', token)

     res.json({
        ok: true,
        uid: usuario.uid,
        name: usuario.name,
        token
    })


    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Oopps'
        })
    }
  
   

    
};

const renewToken = async(req, res = response ) => {
   const uid = req.uid; // estas variables se injectan en el middleware antes de que se pase para este servicio
   const name = req.name;

   const token = await generarJWT(req.uid, req.name);
       
    res.json({
        ok: true,
        token
    

    })
};

module.exports = {
    createUser,
    renewToken,
    loginUser
}