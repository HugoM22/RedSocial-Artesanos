const mysql2= require('mysql2');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'artesanos_db',
    'root',
    '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false,
    define:{
        freezeTableName: true,
        timestamps: false
    }
});
module.exports = sequelize;