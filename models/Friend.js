module.exports =(sequelize, DataTypes) =>{
    return sequelize.define('Friend',{
        id_friend:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        solicitante_id:{
            type: DataTypes.INTEGER,
            allwoNull: false
        },
        receptor_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado:{
            type: DataTypes.ENUM('Pendiente','Aceptado','Rechazado')
        },
        creado_en:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },{
        tableNmae:'friend',
        timestamps: false
    
    });
}