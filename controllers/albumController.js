const {Album,Imagen} = require('../models');

module.exports={
    //listar album de un usuario
    async listar(req, res, next) {
        try{
            const usuarioId=req.params.id;
            const albums = await Album.findAll({
                where: {usuarioId},
                order: [['createdAt', 'DESC']]
            });
            res.render('albums',{albums});
        }catch(err){
            next(err);
        }
    },
    // formulario para crear album
    formCrear(req,res){
        res.render('albumCrear');       
    },
    //crear album
    async crear(req,res,next){
        try{
            const usuairoId= req.session.usuarioId;
            const {titulo} = req.body;
            await Album.create({titulo,usuarioId});
            res.redirect(`/perfil/${usuarioId}`);
        }catch(err){
            next(err);
        }
    }
};