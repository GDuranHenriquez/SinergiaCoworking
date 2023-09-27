const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("purchase", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Purchase'
    }
    );
};