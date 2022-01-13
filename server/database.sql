ALTER TABLE todo
ADD  status boolean;

ALTER TABLE todo
ADD  completed_on BIGINT;


ALTER TABLE ONLY todo ALTER COLUMN status SET DEFAULT false;