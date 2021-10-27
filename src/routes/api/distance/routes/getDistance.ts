import express from 'express';

import { formatCities } from '../../../../common/cityDistance';
import { CitiesDistance } from '../../../../modles/cityDistance';
import { getDistanceBetweenCities } from '../../../../external-services/geo-distance';
import { getCitiesDistanceFromDB, insertCitiesToDB } from '../DL';
import { getValidator, validateRequest } from '../validator';


const getDIstance = express.Router();

getDIstance.get('',
    getValidator,
    validateRequest,
    async (req, res, next) => {
        try {

            const source = req.query?.source as string;
            const destination = req.query?.destination as string;

            const citiesDistance: CitiesDistance = formatCities(source, destination);

            citiesDistance.distance = await getCitiesDistanceFromDB(citiesDistance);
            console.debug('distnace from DB: ', citiesDistance.distance);


            if (citiesDistance.distance) {
                return res.json({ distance: citiesDistance.distance });
            }

            citiesDistance.distance = await getDistanceBetweenCities
                (citiesDistance.source, citiesDistance.destination);

            console.debug('distnace from api:  ', citiesDistance.distance);

            await insertCitiesToDB(citiesDistance);

            return res.json({ distance: citiesDistance.distance });
            // next()
        } catch (error) {
            console.log('getDistance:  got error:  ', error)
            next(error);
        }
    });

export default getDIstance;

