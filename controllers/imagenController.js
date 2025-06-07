const {Imagen} = require('../models');

module.exports = {
    //subir imagen a un album
    async subir(req,res,next){
        try{
            const usuarioId = req.session.usuarioId;
            const{albumId} = req.params;
            const file =req.file;
            await Imagen.create({
                url: `/uploads/${file.filename}`,
                descripcion: req.body.descripcion,
                albumId,
                usuarioId
            });
            res.redirect(`/album/${albumId}`);
        }catch(err){
            next(err);
        }
    }
};