import express from 'express'

import { isSchemeConnected } from './DL';

const router = express.Router();

router.get('', async (req, res, next) => {
    try {
        await isSchemeConnected()
        return res.status(200).json();
    } catch (error) {
        next(error);
    }
});

export default router;
