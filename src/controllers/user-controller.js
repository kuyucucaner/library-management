const UserModel = require('../models/user-model');
const BorrowedBookModel = require('../models/borrowed-book-model');
const BookModel = require('../models/book-model');

const UserController = {
    getAllUsers: async function (req, res) {
        try {
            const users = await UserModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    },

    getUserById: async function (req, res) {
        const { userId } = req.params;
        try {
            const userWithBooks = await UserModel.findByPk(userId, {
                include: [
                    {
                        model: BorrowedBookModel,
                        include: { model: BookModel, attributes: ['name', 'average_score'] }
                    }
                ]
            });
    
            if (userWithBooks) {
                const pastBooks = userWithBooks.BorrowedBooks.filter(book => book.status === 'returned');
                const currentBooks = userWithBooks.BorrowedBooks.filter(book => book.status === 'borrowed');
    
                const response = {
                    id: userWithBooks.id,
                    name: userWithBooks.name,
                    pastBooks: pastBooks,
                    currentBooks: currentBooks
                };
    
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    },
    
    createUser: async function (req, res) {
        const { name } = req.body;
        try {
            const user = await UserModel.create({ name });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
};

module.exports = UserController;
