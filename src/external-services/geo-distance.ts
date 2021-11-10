import axios from 'axios';

import { isFloat } from '../common/functions';
import { paramError } from '../errors/paramError';
import { ExternalServiceError } from '../errors/extenalServiceError';
import { BaseError } from '../errors/baseError';
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
            if (error instanceof BaseError) {
                throw error;
            }
            throw new BaseError('Internal Service Error', 500, error);
        })
}

const getDistanceFromResponse = (data) => {
    const distance = +data?.rows[0]?.elements[0]?.distance?.text?.split(' km')[0];
    if (isFloat(distance) || Number.isInteger(distance)) {
        return distance;
    }

    const elementStatus = data?.rows[0]?.elements[0]?.status;
    const requestStatus = data?.status;
    if (requestStatus === 'OK') {
        switch (elementStatus) {
            case 'NOT_FOUND':
                throw new paramError("source or destination not valid");

            case 'ZERO_RESULTS':
                throw new BaseError("No available route", 404);
        }
    }

    throw new ExternalServiceError('Unhandled response from google');
}