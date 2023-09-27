const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessLevel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: 'User'
    })
}