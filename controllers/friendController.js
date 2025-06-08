const {Friend} = require('../models');

module.exports ={
    async toggleAmigo(req, res, next) {
        try{
            const usuarioId = req.session.usuarioId;
            const amigoId = req.params.id;

            // ya existe relacion?
            const relacion = await Friend.findOne({
                where:{usuarioId, amigoId}
            });
            if(relacion){
                await relacion.destroy();
                return res.json({satuts:'eliminado'});
            }
            await Friend.create({usuarioId,amigoId});
            res.json({status:'agregado'});
        }catch(err){
            next(err);
        }
    }
};