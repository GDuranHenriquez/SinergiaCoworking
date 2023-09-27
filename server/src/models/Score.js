const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("score", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Score'
    }
    );
};
