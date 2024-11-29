const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();  
const sequelize = new Sequelize('library_management', 'root', process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  
});

module.exports = sequelize;
