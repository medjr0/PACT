UPDATE service SET isApproved=1 WHERE title="I Need";
INSERT INTO service_category(service_id, category_id) VALUES (2,3);

ALTER TABLE association ADD COLUMN lat FLOAT;
ALTER TABLE association ADD COLUMN lon FLOAT;

UPDATE association SET lat=48.8503,lon=2.38899 WHERE id=1;
UPDATE association SET lat=48.7129116,lon=2.1998893037725673 WHERE id=6;

INSERT INTO rating(service_id, rating) VALUES (1,1), (1,1), (1,-1), (1,1), (1,-1), (1,1), (1,1);
INSERT INTO rating(service_id, rating) VALUES (2,1), (2,1), (2,1), (2,-1), (2,1), (2,1), (2,1);

CREATE FUNCTION ineed.GREAT_CIRCLE_DISTANCE3(lat1 FLOAT, lon1 FLOAT, lat2 FLOAT, lon2 FLOAT) RETURNS FLOAT BEGIN SET lat1 = lat1*PI()/180; SET lon1 = lon1*PI()/180; SET lat2 = lat2*PI()/180; SET lon2 = lon2*PI()/180; RETURN 2*6371*ASIN(SQRT(POW(SIN((lat1-lat2)/2),2)+(1-POW(SIN((lat1-lat2)/2),2)-POW(SIN((lat1+lat2)/2),2))*POW(SIN((lon1-lon2)/2),2))); END;

#GISTI
UPDATE association SET lat=48.8587474,lon=2.3756058 WHERE id=2;