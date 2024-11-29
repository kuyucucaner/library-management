const express = require('express');
const UserController = require('../controllers/user-controller');
const { nameValidation, validate } = require('../utils/validation'); // Veri doğrulama
const router = express.Router();

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getUserById);

router.post('/', nameValidation, validate, UserController.createUser);

module.exports = router;
