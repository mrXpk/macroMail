import express from 'express';
import { generateEmail, getEmails, deleteEmail } from '../controllers/emailController.js';

const router = express.Router();

// Generate new temporary email
router.post('/generate', generateEmail);

// Get emails for a specific temporary email address
router.get('/:email', getEmails);

// Delete a specific email
router.delete('/:email', deleteEmail);

export default router;
