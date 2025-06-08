const multer = require('multer');
const path = require('path');

//define carpeta de destino y nombre archivo

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname,'../public/uploads'));
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        cb(null,Date.now()+ext);
    }
});

//filtrar solo imagenes y limitar tamaño a 5mb

const fileFilter = (req,file,cb) => {
    if(/^image\/(jpeg|jpg|png|gif)$/.test(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Solo se permiten imagenes JPEG, PNG O GIF'), false);
    }
};
module.exports = multer({
    storage,
    fileFilter,
    limits:{fileSize: 5 * 1024 * 1024} // 5 MB
});