import express from 'express'

import { isSchemeConnected } from './DL';

const router = express.Router();

router.get('', async (req, res) => {
    try {
        await isSchemeConnected()
        return res.status(200).json();
    } catch (error: any) {
        return res.sendStatus(500);
    }
});

export default router;
