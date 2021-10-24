import { query } from '../../../db';
import { getMaxHitsCitiesQuery } from "./queries";

export const getMaxHitCities = () => {
    return query(getMaxHitsCitiesQuery, [])
        .then((result: any) => result?.rows[0]);
}