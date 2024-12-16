import express from 'express';
import { generatePhone, getMessages, deletePhone, receiveSMS } from '../controllers/phoneController.js';

const router = express.Router();

router.post('/generate', generatePhone);
router.get('/:phone', getMessages);
router.delete('/:phone', deletePhone);
router.post('/webhook', receiveSMS);

export default router;
