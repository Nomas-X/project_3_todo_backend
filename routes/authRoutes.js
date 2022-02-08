const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.signup_post);
router.get('/', authController.signup_get);

module.exports = router;
