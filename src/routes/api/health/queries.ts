export const isSchemeExistQuery = `
SELECT exists(
    select schema_name
    FROM information_schema.schemata
    WHERE schema_name = $1
);
`