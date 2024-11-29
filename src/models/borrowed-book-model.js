const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./user-model');
const BookModel = require('./book-model');

const BorrowedBookModel = sequelize.define('BorrowedBook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('borrowed', 'returned'),
        allowNull: false
    },
    score: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    borrowed_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
         field: 'user_id'
    },
    book_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        field: 'book_id' 
    }
}, {
    timestamps: false,
    tableName: 'borrowed_books' 
});

// İlişkileri belirtmek
UserModel.hasMany(BorrowedBookModel, { foreignKey: 'user_id' });
BookModel.hasMany(BorrowedBookModel, { foreignKey: 'book_id' });
BorrowedBookModel.belongsTo(UserModel, { foreignKey: 'user_id' });
BorrowedBookModel.belongsTo(BookModel, { foreignKey: 'book_id' });


module.exports = BorrowedBookModel;
