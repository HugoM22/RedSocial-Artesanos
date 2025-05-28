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

// Levantar Servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

