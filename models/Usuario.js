module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('Usuario', {
        id_usuario:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        sexo:{
            type: DataTypes.ENUM('MASCULINO', 'FEMENINO', 'OTRO'),
            allowNull: false
        },
        antecedentes:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        imagen_perfil:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        creado_en:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },{
        tableName: 'usuario',
        timestamps: false
    });
    };