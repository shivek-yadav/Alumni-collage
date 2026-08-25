import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllAlumni,
  searchUsers
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Specific routes first
router.get('/alumni', getAllAlumni);
router.get('/search', searchUsers);

// Base route for /api/users
router.get('/', getAllUsers);

// Dynamic ID routes last
router.get('/:id', getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;
