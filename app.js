const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuracion de Pug 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Arcivos estaticos
app.use(express.static(path.join(__dirname,'public')));

// Ruta de ejemplo 
app.get('/', (req, res) => {
    res.render('index', { title: 'Red Social de Artesanos' });
});
// Pagina de login 
app.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesion' });
});

// Pagina de registro 
app.get('/registrar', (req, res) => {
    res.render('registrar', { title: 'Crear Usuario' });
});
// Pagina de inicio 
app.get('/inicio', (req, res) => {
    res.render('inicio', { title: 'Inicio' });
});

//Probar conexion de base de datos 
const sequelize = require('./config/database'); 
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos.✅');
    } catch (error) {
        console.error('⛔⛔ No se pudo conectar a la base de datos:', error);
    }
})();

// Levantar Servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

