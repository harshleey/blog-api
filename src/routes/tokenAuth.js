/* eslint-disable no-undef */
const express = require('express');
const { register, login, profile } = require('../controllers/tokenAuth.js');
const { tokenAuth } = require('../middleware/tokenAuth.js');
const {
    loginAuthValidationRegister,
    registerAuthValidationRegister,
    validateAuth,
} = require('../middleware/authValidator.js');

const router = express.Router();

router.post(
    '/register',
    registerAuthValidationRegister,
    validateAuth,
    register,
);
router.post('/login', loginAuthValidationRegister, validateAuth, login);
router.get('/profile', tokenAuth, profile);

module.exports = router;
