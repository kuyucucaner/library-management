const express = require('express');
const BookController = require('../controllers/book-controller');
const router = express.Router();
const { nameValidation, validate } = require('../utils/validation'); 

router.get('/', BookController.getAllBooks);

router.get('/:bookId', BookController.getBookById);

router.post('/', nameValidation , validate,BookController.createBook);

module.exports = router;
