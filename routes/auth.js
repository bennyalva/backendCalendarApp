
/*
 rutas de usuarios /auth
 host/api/auth
*/
const {Router} = require('express');  
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


router.post('/new',
             [
                 check('name', 'El nombre es obligatorio').not().isEmpty(),
                 check('email', 'El email es obligatorio').isEmail(),
                 check('password', 'El password debe ser 6 caracteres').isLength({min: 6}),
                 validarCampos

             ], 
             createUser );
router.post('/',
              [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe ser 6 caracteres').isLength({min: 6}),
                validarCampos
              ],
               loginUser );
router.get('/renew', validarJwt , renewToken );


module.exports = router;