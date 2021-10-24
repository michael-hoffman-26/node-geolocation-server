export const getMaxHitsCitiesQuery = `
SELECT source, destination, hits
FROM synamedia.cities_dist
ORDER BY hits DESC
LIMIT 1;`