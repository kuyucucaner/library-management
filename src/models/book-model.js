const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookModel = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    average_score: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: -1
    }
}, {
    timestamps: false
});

module.exports = BookModel;
