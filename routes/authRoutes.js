const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signcheck', authController.signcheck_get);
router.get('/signout', authController.signout);
router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);


module.exports = router;
