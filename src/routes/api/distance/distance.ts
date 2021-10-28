import express from 'express'

import * as getDistanceRoutes from './routes/getDistance'
import { postDistance } from './routes/postDistance'
import { getValidator, postValidator, validateRequest } from './validator';

const router = express.Router();


router.get('',
    getValidator,
    validateRequest,
    getDistanceRoutes.getDistanceFromDB,
    getDistanceRoutes.getDistanceFromExternalService,
    getDistanceRoutes.saveAndReturnDistance
);

router.post('',
    postValidator,
    validateRequest,
    postDistance
);

export default router;
