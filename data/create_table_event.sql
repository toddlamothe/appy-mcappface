-- Table: event

-- DROP TABLE event;

CREATE TABLE event
(
  id SERIAL PRIMARY KEY,
  datetime date NOT NULL,
  entrytype text NOT NULL,
  comments text
)
WITH (
  OIDS=FALSE
);
ALTER TABLE event
  OWNER TO postgres;
