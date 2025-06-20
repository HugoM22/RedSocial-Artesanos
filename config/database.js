require('dotenv').config();
const mysql2= require('mysql2');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_URL, 
    {
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
        define:{
            freezeTableName: true,
            timestamps: true,
            createdAt: 'creado_en',
            updatedAt: 'actualizado_en',
        }
});
module.exports = sequelize;

