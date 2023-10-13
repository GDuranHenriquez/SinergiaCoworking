const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("stripe", {
        payment_method: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
         amount: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        confirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false,
        tableName: 'Stripe'
    }
    );
};