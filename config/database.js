const {sequelize} = require('sequelize');

const sequelize = new Sequelize('basedatos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});
//Cambiar dato para darle de alta dx
module.exports = sequelize;