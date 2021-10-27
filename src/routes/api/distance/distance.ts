import express from 'express'

import getDistance from './routes/getDistance'
import { postDistance } from './routes/postDistance'
import { getValidator, postValidator, validateRequest } from './validator';

const router = express.Router();


router.get('',

    getDistance
);

router.post('',
    postValidator,
    validateRequest,
    postDistance
);

export default router;
