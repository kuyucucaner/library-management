const { Sequelize } = require('sequelize');

// Veritabanı bağlantısı
const sequelize = new Sequelize('library_management', 'root', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
