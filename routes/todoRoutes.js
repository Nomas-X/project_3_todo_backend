const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/dashboard', todoController.list_index);
// router.post('/dashboard', todoController.todo_create_item);
// router.delete('/dashboard', todoController.todo_delete);

module.exports = router;