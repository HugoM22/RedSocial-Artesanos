const {Imagen} = require('../models');

module.exports = {
    //subir imagen a un album
    async subir(req,res,next){
        try{
            const usuarioId = req.session.usuarioId;
            const { albumId } = req.params;
            const file = req.file;
            if (!file) {
                return res.status(400).send('No se subió ningún archivo.');
            }
            await Imagen.create({
                url: `/uploads/${file.filename}`,
                descripcion: req.body.descripcion,
                album_id: albumId,
                usuario_id: usuarioId
            });
            res.redirect(`/album/${albumId}`);
        } catch (err) {
            next(err);
        }
    }
};