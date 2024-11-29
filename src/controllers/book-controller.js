const BookModel = require('../models/book-model');

const BookController = {

    getAllBooks: async function (req, res) {
        try {
            const books = await BookModel.findAll(); 
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving books', error });
        }
    },

    getBookById: async function (req, res) {
        const { bookId } = req.params;  
        try {
      
            const book = await BookModel.findByPk(bookId);

   
            if (book) {
                res.status(200).json(book);  
            } else {
                res.status(404).json({ message: `Book with ID ${bookId} not found` });  
            }
        } catch (error) {
        
            res.status(500).json({ message: 'Error retrieving book', error: error.message });
        }
    },


    createBook: async function (req, res) {
        const { name, average_score } = req.body;

        try {
            const book = await BookModel.create({ name, average_score }); 
            res.status(201).json(book);  
        } catch (error) {
            res.status(500).json({ message: 'Error creating book', error });
        }
    }
};

module.exports = BookController;
