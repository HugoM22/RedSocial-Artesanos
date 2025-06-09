require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');
require('./models');

const app = express();
const PORT =  process.env.PORT || 3000;

// Configuracion de Vistas
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Middlewares globlales
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static(path.join(__dirname,'public')));

//Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
//importar rutas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const albumRoutes = require('./routes/albumRoutes');
const imagenRoutes = require('./routes/imagenRoutes');
const homeRoutes = require('./routes/homeRoutes');
const friendRoutes = require('./routes/friendRoutes');

// Usar rutas
app.use('/',authRoutes);
app.use('/', homeRoutes);
app.use('/perfil', usuarioRoutes);
app.use('/perfil',albumRoutes);
app.use('/album', imagenRoutes);
app.use('/friend', friendRoutes);



// -----Manejo de 404-----
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// ------Conexion y sincronizacion de la base de datos ------
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos.✅');
        // Sincroniza tablas segun los modelos
        await sequelize.sync({alter:true})
        console.log('✅ Tablas sincronizadas correctamente');
    } catch (error) {
        console.error('⛔⛔ No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
})();
// --------Levantar Servidor-------- 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

