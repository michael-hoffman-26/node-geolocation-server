import { formatCities } from '../../../../common/cityDistance';
import { CitiesDistance } from '../../../../modles/cityDistance';
import { getDistanceBetweenCities } from '../../../../external-services/geo-distance';
import { getCitiesDistanceFromDB, insertCitiesToDB } from '../DL';

export const getDistanceFromDB = async (req, res, next) => {
    try {

        const source = req.query?.source as string;
        const destination = req.query?.destination as string;

        const citiesDistance: CitiesDistance = formatCities(source, destination);
        res.locals.citiesDistance = citiesDistance;
        citiesDistance.distance = await getCitiesDistanceFromDB(citiesDistance);
        console.debug('distnace from DB: ', citiesDistance.distance);


        if (citiesDistance.distance) {
            return res.json({ distance: citiesDistance.distance });
        }

        next();
    } catch (error) {
        next(error)
    }
};


export const getDistanceFromExternalService = async (req, res, next) => {
    try {
        const citiesDistance: CitiesDistance = res.locals?.citiesDistance;

        res.locals.citiesDistance.distance = await getDistanceBetweenCities
            (citiesDistance.source, citiesDistance.destination);

        console.debug('distnace from api:  ', res.locals.citiesDistance.distance);

        next();
    } catch (error) {
        next(error);
    }
}

export const saveAndReturnDistance = async (req, res, next) => {
    try {
        const citiesDistance: CitiesDistance = res.locals?.citiesDistance;
        await insertCitiesToDB(citiesDistance);

        return res.json({ distance: citiesDistance });
    } catch (error) {
        next(error)
    }
}