const express = require('express');
const router = express.Router();
const { 
  getAllTodos, 
  createTodo, 
  deleteTodo,
  summarizeTodos
} = require('../controllers/todoController'); 

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/summarize', summarizeTodos);

module.exports = router;