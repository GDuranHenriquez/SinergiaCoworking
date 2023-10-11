const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("reservation", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Reservation'
    }
    );
};