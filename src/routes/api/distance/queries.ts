export const getCitiesDistnceQuery = `
UPDATE synamedia.cities_dist
    SET hits=hits+1
WHERE source = $1
AND destination = $2
RETURNING distance
`

export const insertCitiesDistanceQuery = `
 INSERT INTO synamedia.cities_dist(
    source,
    destination,
    distance,
    hits
) VALUES
    ($1, $2, $3, 1);`

export const upsertCitiesDistanceQuery = `
INSERT INTO synamedia.cities_dist(
    source,
    destination,
    distance,
	hits
) VALUES
    ($1, $2, $3, 0)
ON CONFLICT(source, destination) DO UPDATE
SET distance = $3
RETURNING hits;`