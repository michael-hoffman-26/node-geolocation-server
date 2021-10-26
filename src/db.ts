import { DBError } from './errors/dbError';
import { Pool } from 'pg';

const user = process.env.PG_USERNAME || "postgres";
const password = process.env.PG_PASSWORD || "postgres";
const host = process.env.PG_HOST || "localhost";
const database = process.env.PG_DB || "synamedia";
const port = (process.env.PG_PORT || 5432);

const pool = new Pool({ user, host, database, password, port: +port });

export const query = (text, params) => {
    return pool.query(text, params).catch(error => {
        throw new DBError(error);
    })
}