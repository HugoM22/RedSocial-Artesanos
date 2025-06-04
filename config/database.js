const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'artesanos_db',
    'root',
    '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define:{
        freezeTableName: true,
        timestamps: false
    }
});
//Cambiar dato para darle de alta dx
module.exports = sequelize;