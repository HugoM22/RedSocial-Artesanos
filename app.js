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

// --->Ruta de ejemplo<--- 
app.get('/', (req, res) => {
    res.render('index', { title: 'Red Social de Artesanos' });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesion' });
});
app.get('/registrar', (req, res) => {
    res.render('registrar', { title: 'Crear Usuario' });
});
app.get('/inicio', (req, res) => {
    res.render('inicio', { title: 'Inicio' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

//Probar conexion de base de datos 
// Middleware de session
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos.✅');
        // Sincroniza tablas segun los modelos
        await sequelize.sync({alter:true})
        console.log('✅ Tablas sincronizadas correctamente');
    } catch (error) {
        console.error('⛔⛔ No se pudo conectar a la base de datos:', error);
    }
})();
// Levantar Servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

