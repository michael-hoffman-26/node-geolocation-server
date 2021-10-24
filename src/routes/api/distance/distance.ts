import express from 'express'
import { body, query } from 'express-validator';

import { formatCities } from '../../../common/cityDistance';
import { CitiesDistance } from '../../../modles/cityDistance';
import { getDistanceBetweenCities } from '../../../external-services/geo-distance';
import { ExternalServiceError } from '../../../errors/extenalServiceError';
import { DBError } from '../../../errors/dbError';
import { paramError } from '../../../errors/paramError';
import { getCitiesDistanceFromDB, insertCitiesToDB, upsertCitiesDistance } from './DL';
import { validateRequest } from './validator';

const router = express.Router();

router.get('',
    query('source', 'source param, is mandatory').exists().bail().trim().toUpperCase(),
    query('destination', 'destination param, is mandatory').exists().bail().trim().toUpperCase().custom((value, { req }) => {
        if (value === req.query?.source) {
            throw new Error('Source and destination not allowed to be equals');
        }


        // Indicates the success of this synchronous custom validator
        return true;
    }),
    (req, res, next) => validateRequest(req, res, next),
    async (req, res) => {
        const source = req.query?.source as string;
        const destination = req.query?.destination as string;

        const citiesDistance: CitiesDistance = formatCities(source, destination);

        let isConnectedToDB = true;
        try {
            citiesDistance.distance = await getCitiesDistanceFromDB(citiesDistance);
            console.debug('distnace from DB: ', citiesDistance.distance);
        } catch (error) {
            if (error instanceof DBError) {
                isConnectedToDB = false;
                console.error('DB Error: ', error);
            }
        }

        if (citiesDistance.distance) {
            return res.json({ distance: citiesDistance.distance });
        }

        try {
            citiesDistance.distance = await getDistanceBetweenCities
                (citiesDistance.source, citiesDistance.destination);
        } catch (error) {
            if (error instanceof ExternalServiceError) {
                console.error('Error when trying to fetch data from external service:  ', error);
                return res.sendStatus(500)
            }

            if (error instanceof paramError) {
                console.error('error in param:  ', error);
                return res.status(400).json({ error: error.message });
            }
        }
        console.debug('distnace from api:  ', citiesDistance.distance);

        if (isConnectedToDB) {
            try {
                await insertCitiesToDB(citiesDistance)
            } catch (error) {
                if (error instanceof DBError) {
                    console.error('DB Error: ', error);
                }
            }
        }

        return res.json({ distance: citiesDistance.distance });
    });


router.post('',
    body('source', 'source param, is mandatory').exists().bail().trim().toUpperCase(),
    body('destination', 'destination param, is mandatory').exists().bail().trim().toUpperCase().custom((value, { req }) => {
        if (value === req.body.source) {
            throw new Error('Source and destination not allowed to be equals');
        }

        // Indicates the success of this synchronous custom validator
        return true;
    }),
    body('distance', 'distance param, is mandatory').exists().trim().isFloat(),
    (req, res, next) => validateRequest(req, res, next),
    async (req, res) => {
        const source = req.body?.source as string;
        const destination = req.body?.destination as string;
        const distance = req.body?.distance as number;

        const citiesDistance: CitiesDistance = formatCities(source, destination);
        citiesDistance.distance = distance;

        try {
            citiesDistance.hits = await upsertCitiesDistance(citiesDistance);
            delete citiesDistance.distance;

            return res.status(201).json(citiesDistance)
        } catch (error) {
            if (error instanceof DBError) {
                console.error('DB Error: ', error);
            }
            return res.sendStatus(500);
        }
    });

export default router;
