module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Album',{
        id_album:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        titulo:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        creado_en:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: false
        }
    },{
        tableName: 'album',
        timestamps: false,
    });
};