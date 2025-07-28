import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = express.Router();

router.post('/', protect, createTodo);     // only logged-in users can create
router.get('/', protect, getTodos);        // only logged-in users can view
router.put('/:id', protect, updateTodo);   // only logged-in users can update
router.delete('/:id', protect, deleteTodo);// only logged-in users can delete

export default router;
