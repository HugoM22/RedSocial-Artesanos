const {Op, where} = require('sequelize');

const {
    Usuario,
    Friend,
    Imagen,
    ImagenCompartida,
    Comentario,
    Album
} = require('../models');

module.exports = {
    //Mostrar pagina principal
    async showHome(req,res,next){
        try{
            const usuarioId = req.session.usuarioId; 
            
            // 1-Solicitudes pendientes
            const solicitudes = await Friend.findAll({
                where:{
                    status: 'pendiente',
                    receptor_id: usuarioId
                },
                include:[{
                    model: Usuario,
                    as: 'Solicitante',
                    attributes:['id','nombre','avatarUrl']
                }]
            });
            //2-Lista de amigos aceptados (para comparitr)
            const amigos=await Friend.findAll({
                where:{
                    status: 'aceptado',
                    [Op.or]:[
                        {solicitante_id: usuarioId},
                        {receptor_id: usuarioId}
                    ]
                },
                include:[{
                    model: Usuario,
                    as: 'Contacto',
                    attributes:['id','nombre']
                }]
        })
        const contactos = amigos.map(f=>{
            //si yo soy el solicitante muestro al otro o viceversa
            const amigo=f.solicitante_id===usuarioId ? f.Contacto : f.Contacto;
            return{id: amigo.id, nombre:amigo.nombre}
        });

        // feed images compartidas conmigo
        const compartidas= await ImagenCompartida.findAll({
            where:{usuario_id: usuarioId},
            include:[{
                model: Imagen,
                include:[
                    {model: Usuario, attributes: ['id','nombre']},
                    {model: Comentario,
                        include:[{model: Usuario, attributes:['nombre']}]
                    }
                ]
            }],
            order:[['createdAt', 'DESC']]
        });
        res.render('index',{solicitudes,compartidas,contactos});
        }catch(err){
            next(err);
        }
    },
    // Enviar solicitud de amistad
    async sendRequest(req,res,next){
        try{
            const solicitante_id = req.session.usuarioId;
            const {receptorId} = req.body;
            await Friend.create({
                solicitante_id,
                receptor_id: receptorId,
                status: 'pendiente'
            });
            res.redirect('/');
        }catch(err){
            next(err);
        }
    },
    // Responder solicitud de amistad aceptar/rechazar
    async respondRequest(req,res,next){
        try{
            const usuarioId = req.session.usuarioId;
            const {solicitudId,action}=req.body;
            const sol= await Friend.findByPk(solicitudId);
            if(!sol|| sol.receptor_id !== usuarioId) return res.redirect('/');

            if (action === 'aceptar'){
                sol.status = 'aceptado';
                await sol.save();
                //crear album automatico al solicitante
                const usuarioAcept = await Usuario.findByPk(usuarioId);
                await Album.create({
                    titulo: usuarioAcept.nombre,
                    usuario_id: sol.solicitante_id
                });
        }else{
            sol.status = 'rechazado';
            await sol.save();
        }
        res.redirect('/');
    }catch(err){
            next(err);
        }
    },
    //POST publicar imagen 
    async publishImage(req,res,next){
        try{
            const usuarioId = req.session.usuarioId;
            const file = req.file;
            const {descripcion, compartirCon}= req.body;
            if(!file)return res.status(400).send('No se subio ningun archivo');
            //crear registo de la imagen
            const imagen = await Imagen.create({
                url: `/uploads/${file.filename}`,
                descripcion,
                album_id: null,
                usuario_id: usuarioId
            });
            //Compartir con uno o varios contactos
            const lista = Array.isArray(compartirCon)? compartirCon:[compartirCon];
            for(const id of lista){
                await ImagenCompartida.create({
                    usuario_id: id,
                    imagen_id: imagen.id
                });
            }
            res.redirect('/');
        }catch(err){
            next(err);
        }
    }
};
