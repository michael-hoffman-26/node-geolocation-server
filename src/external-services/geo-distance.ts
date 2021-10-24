import axios from 'axios';

import { isFloat } from '../common/functions';
import { paramError } from '../errors/paramError';
import { ExternalServiceError } from '../errors/extenalServiceError';
require('dotenv').config();

const api = process.env.GOOGLE_API_KEY || '';

export const getDistanceBetweenCities = (cityA: string, cityB: string) => {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'

    return axios.get(url, {
        params: {
            origins: cityA,
            destinations: cityB,
            departure_time: 'now',
            key: api
        }
    })
        .then((response) =>
            getDistanceFromResponse(response.data)
        ).catch(error => {
            if (error instanceof paramError) {
                throw error;
            }
            throw new ExternalServiceError(JSON.stringify(error));
        })
}

const getDistanceFromResponse = (data) => {
    const distance = +data?.rows[0]?.elements[0]?.distance?.text?.split(' km')[0];
    if (isFloat(distance) || Number.isInteger(distance)) {
        return distance;
    }

    console.log('response from google:  ', JSON.stringify(data));

    const elementStatus = data?.rows[0]?.elements[0]?.status;
    const requestStatus = data?.status;
    if (requestStatus === 'OK') {
        switch (elementStatus) {
            case 'NOT_FOUND':
                throw new paramError("source or distnation not valid");

            case 'ZERO_RESULTS':
                throw new paramError("No availble route");
        }
    }
    throw new ExternalServiceError('Unkown Error');

}