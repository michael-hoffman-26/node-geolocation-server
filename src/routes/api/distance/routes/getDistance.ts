import express from 'express'

import { formatCities } from '../../../../common/cityDistance';
import { CitiesDistance } from '../../../../modles/cityDistance';
import { getDistanceBetweenCities } from '../../../../external-services/geo-distance';
import { getCitiesDistanceFromDB, insertCitiesToDB } from '../DL';
import { validateRequest, getValidator } from '../validator';
import { DBError } from '../../../../errors/dbError';
import { printError } from '../../../../middleware/errorHandler';

const router = express.Router();

function handleDbError(error: unknown) {
    if (!(error instanceof DBError)) {
        throw error;
    }
    else {
        printError(error, true);
    }
}

router.get('',
    getValidator,
    (req, res, next) => validateRequest(req, res, next),
    async (req, res, next) => {
        try {

            const source = req.query?.source as string;
            const destination = req.query?.destination as string;

            const citiesDistance: CitiesDistance = formatCities(source, destination);

            try {
                citiesDistance.distance = await getCitiesDistanceFromDB(citiesDistance);
                console.debug('distnace from DB: ', citiesDistance.distance);
            } catch (error) {
                handleDbError(error);
            }

            if (citiesDistance.distance) {
                return res.json({ distance: citiesDistance.distance });
            }

            citiesDistance.distance = await getDistanceBetweenCities
                (citiesDistance.source, citiesDistance.destination);

            console.debug('distnace from api:  ', citiesDistance.distance);

            try {
                await insertCitiesToDB(citiesDistance);
            } catch (error) {
                handleDbError(error);
            }

            return res.json({ distance: citiesDistance.distance });

        } catch (error) {
            next(error)
        }
    });

export default router;