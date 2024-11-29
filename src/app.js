const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); 
const userRoutes = require('./routes/user-routes'); 
const bookRoutes = require('./routes/book-routes'); 
const borrowedBookRoutes = require('./routes/borrowed-book-routes');
const errorHandler = require('./middlewares/error-handler'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  

// API rotalarını tanımlıyoruz
app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/books', bookRoutes); 
app.use('/api/v1/borrowedBooks', borrowedBookRoutes); 

app.use(errorHandler);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
        
        sequelize.sync({ alter: true })  
            .then(() => {
                console.log('All models were synchronized successfully!');
            })
            .catch(err => console.log('Error syncing models:', err));
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });
    app.get('/', (req, res) => {
        res.send('Welcome to the API');
    });
    
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
