const {Usuario, Album,Imagen,Friend} = require('../models');
module.exports={
    // Mostrar perfil del usuario con sus albumnes
    async verPerfil(req,res,next){
        try{
            const usuarioId= req.params.id;
            const usuario = await Usuario.findByPk(usuarioId,{
                attributes:['id','nombre','email','avatarUrl'],
                include:[
                    {
                        model: Album,
                        attributes:['id_album','titulo','creado_en'],
                    }
                ]
            });
            if(!usuario)return res.status(404).render('404');
            res.render('perfil',{usuario});
        }catch(err){
            next(err);
        }
    },
    //Mostrar Formulario de edicion de perfil
    async editarForm(req,res,next){
        try{
        const usuario = await Usuario.findByPk(req.session.usuarioId);
            res.render('perfilEditar' , {usuario});
        } catch(err){
            next(err);
        }
    },
    //Procesar actualizacion de datos perfil
    async actualizar(req,res,next){
        try{
            const usuarioId = req.session.usuarioId;
            const {nombre,email}=req.body;
        await Usuario.update({nombre,email},{where:{id:usuarioId}});
            res.redirect(`/perfil/${usuarioId}`);
        }catch(err){
            next(err);
        }
    }
};