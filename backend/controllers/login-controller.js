'use strict'

const User = require('../models/user-model');
const UserController = { };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



UserController.signup = async (req, res) => { //Ver si dejar o comentar
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            res.send(hash)
        });
    });
}

UserController.signin = async (req, res) => {
    try {       
        if (!req.body.username || !req.body.password) {
            throw new Error('User or password is empty');
        };
        const user = await User.findOne({
            where: {
                nombre_usuario: req.body.username
            }
        });
        if (!user) {
            throw new Error('Wrong username or password');
        };
        const match = await bcrypt.compare(req.body.password, user.contrasenia);
        if(!match) {
            throw new Error('Wrong username or password');
        };
        const token = jwt.sign({
            username: user.nombre_usuario, 
            password: user.contrasenia
        }, 
        'wordKey', { 
            expiresIn: '3h' 
        });
        res.status(200).json({token});
    } catch (err){
        res.status(400).json(err.message);
    }
    
}


UserController.verifyToken = async (req, res, next) => {
    try {
        //Si estoy tratando de loguearme o checkear el token, no validar y dejarlo pasar
        if(req.originalUrl === '/signin' || req.originalUrl === '/checkExpirationToken') { 
            next();
            return;
        };
        if(!req.headers.authorization){
            throw new Error('You must log in');
        };
        const token = req.headers.authorization.split(' ')[1];
        if(token === null){
            throw new Error('You must log in');
        };
        const payload = jwt.verify(token, 'wordKey');
        if (await checkUserAndPassword(payload)) {
            next();
        } else {
            throw new Error('You must log in');
        };
    } catch (err) {
        res.status(400).json(err.message);
    }    
} 

UserController.checkTokenExpiration = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(token === null){
            throw new Error();
        }
        const payload = jwt.verify(token, 'wordKey');
        res.status(200).json('Token is valid');
    } catch (err) {
        res.status(200).json('Token is not valid');
    }  
}

const checkUserAndPassword = async (payload) => {
    try {
        const user = await User.findOne({
            where: {
                nombre_usuario: payload.username
            }
        });
        return (payload.password === user.contrasenia);
    } catch (err) {
        throw new Error('An error has ocurred');
    }
}


module.exports = UserController;