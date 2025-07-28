import express from 'express';
import { protect, adminOnly  } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Only logged-in users can access this
router.get('/getusers', protect, getAllUsers);

// Only admin can access this
router.get('/admin-only', protect, adminOnly, (req, res) => {
  res.json({ message: 'You are admin!' });
});

export default router;