const bcrypt = require('bcrypt');
const {Usuario,Login} = require('../models');

module.exports={
    //GET Login
    formLogin(req,res){
        res.render('login',{title:'Iniciar Sesion'});
    },

    //POST Login
    async login(req,res,next){
        try{
            const {email,password} = req.body;
            const usuario = await Usuario.findOne({
                where:{email},
                include: Login
            });
            if(!usuario){
                return res.render('login',{title:'Iniciar Sesion',error:'Credenciales Invalidas'});
            }
            const ok= await bcrypt.compare(password,usuario.Login.password);
            if(!ok){
                return res.render('login',{title:'Iniciar Sesion', error:'Credenciales Invalidas'});
            }
            req.session.usuarioId= usuario.id;
            res.redirect('/');
        }catch(err){
            next(err);
        }
    },
    //POST registar
    async registrar(req,res,next){
        try{
            const {nombre,email,password}=req.body;
            const usuario = await Usuario.create({nombre,email});
            const hash = await bcrypt.hash(password,10);
            await Login.create({usuario_id:usuario.id, password:hash})
            res.redirect('/');
        }catch(err){
            next(err);
        }
    },
    //Get Logout
    logout(req,res){
        req.session.destroy(()=>res.redirect('/login'));
    }
};