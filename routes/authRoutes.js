const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);


module.exports = router;
