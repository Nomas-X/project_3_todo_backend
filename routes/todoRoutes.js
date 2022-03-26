const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/find', todoController.find);
router.post('/add', todoController.add);
router.delete('/delete', todoController.delete);

module.exports = router;