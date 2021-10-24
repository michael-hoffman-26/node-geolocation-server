import { query } from '../../../db';
import { CitiesDistance } from "modles/cityDistance";
import { getCitiesDistnceQuery, insertCitiesDistanceQuery, upsertCitiesDistanceQuery } from "./queries";

export const getCitiesDistanceFromDB = (citiesDistance: CitiesDistance) => {
    return query(
        getCitiesDistnceQuery,
        [citiesDistance.source, citiesDistance.destination]
    )
        .then((result) => result?.rows[0]?.['distance'])
}

export const insertCitiesToDB = (citiesDistance: CitiesDistance) => {
    return query(insertCitiesDistanceQuery, [
        citiesDistance.source,
        citiesDistance.destination,
        citiesDistance.distance
    ])
}

export const upsertCitiesDistance = (citiesDistance: CitiesDistance) => {
    return query(upsertCitiesDistanceQuery, [
        citiesDistance.source,
        citiesDistance.destination,
        citiesDistance.distance
    ]).then((result) => result?.rows[0]?.['hits']);
}