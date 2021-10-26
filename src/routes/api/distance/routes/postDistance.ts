import express from 'express'

import { formatCities } from '../../../../common/cityDistance';
import { CitiesDistance } from '../../../../modles/cityDistance';
import { upsertCitiesDistance } from '../DL';
import { postValidator, validateRequest } from '../validator';

const router = express.Router();

router.post('',
    postValidator,
    (req, res, next) => validateRequest(req, res, next),
    async (req, res, next) => {
        const source = req.body?.source as string;
        const destination = req.body?.destination as string;
        const distance = req.body?.distance as number;

        try {
            const citiesDistance: CitiesDistance = formatCities(source, destination);
            citiesDistance.distance = distance;


            citiesDistance.hits = await upsertCitiesDistance(citiesDistance);
            delete citiesDistance.distance;

            return res.status(201).json(citiesDistance)
        } catch (error) {
            next(error)
        }
    });

export default router;
