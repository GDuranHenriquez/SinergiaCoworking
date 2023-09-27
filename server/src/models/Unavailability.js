const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("unavailability", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Unavailability'
    }
    );
};