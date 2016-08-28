-- View: event_count

-- DROP VIEW event_count;

CREATE OR REPLACE VIEW event_count AS
 SELECT count(*) AS eventcount
   FROM event;

ALTER TABLE event_count
  OWNER TO postgres;
