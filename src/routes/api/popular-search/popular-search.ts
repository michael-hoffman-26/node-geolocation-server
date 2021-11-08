import express from 'express'
import { CitiesDistance } from 'models/cityDistance';

import { getMaxHitCities } from './DL';

const router = express.Router();

router.get('', async (req, res) => {
    try {
        const popularCities: CitiesDistance = await getMaxHitCities();
        if (!!popularCities) {
            return res.status(200).json(popularCities);
        } else {
            return res.sendStatus(204);
        }
    } catch (error: any) {
        console.error('got error, pop search:  ', JSON.stringify(error));
    }

    return res.sendStatus(500);

});

export default router;
