const express = require('express');
const BorrowedBookController = require('../controllers/borrowed-book-controller');
const router = express.Router();


router.post('/:userId/borrow/:bookId', BorrowedBookController.borrowBook);


router.post('/:userId/return/:bookId', BorrowedBookController.returnBook);

module.exports = router;
