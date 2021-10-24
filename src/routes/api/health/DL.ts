import { query } from '../../../db';
import { isSchemeExistQuery } from "./queries";

const SCHEME_NAME = 'synamedia';

export const isSchemeConnected = () => {
    return query(isSchemeExistQuery, [SCHEME_NAME])
}