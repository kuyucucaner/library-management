const { check, validationResult } = require('express-validator');

const nameValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { nameValidation, validate };
