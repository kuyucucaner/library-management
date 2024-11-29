const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false ,
    tableName: 'users'  

});

module.exports = UserModel;
