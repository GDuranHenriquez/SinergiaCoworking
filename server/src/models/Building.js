const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('building', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Building'
    })
}