const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("officeImage", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'OfficeImage'
    }
    );
};