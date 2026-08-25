import express from 'express';
import {
    getConnections,
    getPendingRequests,
    sendConnectionRequest,
    acceptConnection,
    rejectConnection,
    deleteConnection
} from '../controllers/connectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ===== Connection Routes =====
router.get('/', protect, getConnections);
router.get('/pending', protect, getPendingRequests);
router.post('/', protect, sendConnectionRequest);
router.put('/:id/accept', protect, acceptConnection);
router.put('/:id/reject', protect, rejectConnection);
router.delete('/:id', protect, deleteConnection);

export default router;
