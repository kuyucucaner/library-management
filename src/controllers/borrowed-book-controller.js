const BorrowedBookModel = require('../models/borrowed-book-model');
const UserModel = require('../models/user-model');
const BookModel = require('../models/book-model');

const BorrowedBookController = {
    borrowBook: async function (req, res) {
        const { userId, bookId } = req.params;

        try {
            const user = await UserModel.findByPk(userId);  
            const book = await BookModel.findByPk(bookId);  

            if (!user || !book) {
                return res.status(404).json({ message: 'User or Book not found' });
            }

     
            const existingBorrowedBook = await BorrowedBookModel.findOne({
                where: { book_id: bookId, status: 'borrowed' }
            });
            if (existingBorrowedBook) {
                return res.status(400).json({ message: 'Book already borrowed by someone else' });
            }

          
            const borrowedBook = await BorrowedBookModel.create({
                user_id: userId,
                book_id: bookId,
                status: 'borrowed'
            });

            res.status(201).json(borrowedBook);  
        } catch (error) {
            res.status(500).json({ message: 'Error borrowing book', error });
        }
    },

    returnBook: async function (req, res) {
        const { userId, bookId } = req.params;
        const { score } = req.body;


        if (score < 0 || score > 10) {
            return res.status(400).json({ message: 'Invalid score. Score must be between 0 and 10.' });
        }

        try {
            const borrowedBook = await BorrowedBookModel.findOne({
                where: { user_id: userId, book_id: bookId, status: 'borrowed' }
            });

            if (!borrowedBook) {
                return res.status(404).json({ message: 'No borrowed book found' });
            }

            borrowedBook.status = 'returned';  
            borrowedBook.score = score;  
            await borrowedBook.save();

            const totalScore = await BorrowedBookModel.sum('score', {
                where: { book_id: bookId, status: 'returned' }
            });

            const totalReviews = await BorrowedBookModel.count({
                where: { book_id: bookId, status: 'returned' }
            });

            const averageScore = totalReviews > 0 ? (totalScore / totalReviews).toFixed(2) : 0;

            await BookModel.update(
                { average_score: averageScore },
                { where: { id: bookId } }
            );

            res.status(200).json(borrowedBook);  
        } catch (error) {
            res.status(500).json({ message: 'Error returning book', error });
        }
    }
};

module.exports = BorrowedBookController;
