import express from 'express'

import getDistance from './routes/getDistance'
import postDistance from './routes/postDistance'

const router = express.Router();


router.get('', getDistance);
router.post('', postDistance);

export default router;
