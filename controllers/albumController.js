const {Album,Imagen} = require('../models');

module.exports={
    //listar album de un usuario
    async listar(req, res, next) {
        try{
            const usuarioId=req.params.id;
            const albums = await Album.findAll({
                where: {usuario_id: usuarioId},
                order: [['creado_en', 'DESC']]
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
            const usuarioId= req.session.usuarioId;
            const {titulo} = req.body;
            await Album.create({titulo,usuario_id: usuarioId});
            res.redirect(`/perfil/${usuarioId}`);
        }catch(err){
            next(err);
        }
    }
};