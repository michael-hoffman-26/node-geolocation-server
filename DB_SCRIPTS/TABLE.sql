CREATE SCHEMA synamedia;

CREATE TABLE synamedia.cities_dist(
	source TEXT,
	destination TEXT,
	distance DOUBLE PRECISION NOT NULL,
	hits INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY(source, destination),
    CHECK (upper(source) = source),
    CHECK (upper(destination) = destination),
    CHECK(source < destination),
    CHECK(distance > 0),
    CHECK(hits >= 0)
);

-- insert into synamedia.cities_dist(
-- 	source,
-- 	destination,
-- 	distance
-- ) VALUES 
-- 	('Jer', 'Tel', '23');

-- select * from synamedia.cities_dist;
