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
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        imgUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaaNaTC8W_ygKLZxLFWpHOerfIYQiVlsuyrw&usqp=CAU"
        }
    },
    {
        timestamps: false,
        tableName: 'User'
    })
}