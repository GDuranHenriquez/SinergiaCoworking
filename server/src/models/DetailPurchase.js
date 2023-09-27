const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("detailPurchase", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'DetailPurchase'
    }
    );
};