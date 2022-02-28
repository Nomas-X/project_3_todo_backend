const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.put('/add', todoController.add);
router.put('/delete', todoController.delete);
router.put('/deleteAll', todoController.deleteAll);


module.exports = router;
