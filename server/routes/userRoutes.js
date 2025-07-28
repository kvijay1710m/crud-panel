import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protect, isAdmin, getAllUsers);

export default router;
