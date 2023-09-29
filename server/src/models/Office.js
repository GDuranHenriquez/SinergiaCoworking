const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("office", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        area: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        ratingAverage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        timestamps: false,
        tableName: 'Office'
    }
    );
};
