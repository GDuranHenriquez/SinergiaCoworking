const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("cart", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }
    },
    {
        timestamps: false,
        tableName: 'Cart'
    }
    );
};