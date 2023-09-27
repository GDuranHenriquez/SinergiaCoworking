const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("officeImage", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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