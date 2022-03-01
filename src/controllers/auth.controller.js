const Users = require('../models/user.model');
const Forms = require('../models/forms.model');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function signIn(req, res){
    try{
        const {email, password} = req.body;
        const foundUser = await Users.findOne({email:email});
        if(!foundUser)  return res.status(401).json({errors:[{msg:"El usuario es incorrecto"}]});
        const matchPassword = await foundUser.comparePassword(password);
        if(!matchPassword) return res.status(401).json({errors:[{msg:"La contraseña es incorrecta"}]});
        const token = jwt.sign({id: foundUser._id}, config.serverConfig.secret, {expiresIn: 86400});//generamos el token para el usuario logueado
        req.session.userToken = token;
        res.status(200).json({token:token, access:true});
    }catch(err){
        console.log(err)
        res.status(401).json({errors:[{msg:"Algo salio mal al iniciar sesion"}]});
    }
}

async function signUp(req, res){
    try{
        delete req.body.confirmPassword;
        const newUser = new Users(req.body);
        newUser.password = await newUser.encryptPassword(newUser.password);
        const saveUSer = await newUser.save();
        console.log(saveUSer);
        const token = jwt.sign({id: saveUSer._id}, config.serverConfig.secret,{expiresIn: 86400});
        req.session.userToken = token;
        res.status(200).json({token:token, access:true});
    }catch(err){
        res.status(401).json({errors:[{msg:"Algo salio mal al registrarse"}]});
    }
}

function lognIn(req, res){//TODO eliminemos el token de la sesion al llegar a esta poagina
    if(req.session){
        req.session.destroy();
        return res.status(200).render('login');
    }
        else return res.status(200).render('login');
}

function register(req, res){
    if(req.session){
        req.session.destroy();
        return res.status(200).render('register')
    }
        else return res.status(200).render('register')
}

async function gotoHome(req, res){//TODO crear un middlerware que permita valida el token y asi verificar el acceso
    try{
        if(req.session.userToken){
            let formularios = await Forms.find();
            console.log(formularios)
            return res.render('home',{formularios});
        } else return res.redirect('/')
    }catch(err){
        console.log('Algo salio mal al solicitar los frmularios');
        return res.status(500).json({errors:[{msg:"Algo salio mal al solicitra los formularios"}]})
    }
}

module.exports = {
    signIn,
    signUp,
    lognIn,
    register,
    gotoHome
}