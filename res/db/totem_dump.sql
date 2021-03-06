--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: totem_log; Type: TABLE; Schema: public; Owner: maiquel; Tablespace: 
--

CREATE TABLE totem_log (
    ref_totem integer,
    date_time timestamp without time zone DEFAULT now(),
    day_week character varying(20) DEFAULT to_char((('now'::text)::date)::timestamp with time zone, 'day'::text),
    situation character varying(1)
);


ALTER TABLE totem_log OWNER TO maiquel;

--
-- Name: totems; Type: TABLE; Schema: public; Owner: maiquel; Tablespace: 
--

CREATE TABLE totems (
    code integer NOT NULL,
    description_id character varying(2044) NOT NULL,
    situation character varying(1),
    latitude character varying(100),
    longitude character varying(100)
);


ALTER TABLE totems OWNER TO maiquel;

--
-- Data for Name: totem_log; Type: TABLE DATA; Schema: public; Owner: maiquel
--

COPY totem_log (ref_totem, date_time, day_week, situation) FROM stdin;
1	2017-05-05 22:30:46.690096	friday   	1
1	2017-05-05 22:32:05.263397	friday   	1
1	2017-05-05 22:33:05.519709	friday   	1
\.


--
-- Data for Name: totems; Type: TABLE DATA; Schema: public; Owner: maiquel
--

COPY totems (code, description_id, situation, latitude, longitude) FROM stdin;
2	Totem 2 - HBB	0	-29.46315	-51.966621
3	Totem 3 - Praça do Chafariz	2	-29.46866093	-51.96386218
4	Totem 4 - SESC	2	-29.4694212	-51.9643181
5	Pritsh Totem	0	-28	-50
6	Teste do LUDI	0	-29	-59
1	Totem 2 - Shopping Lajeado	1	-29.4494285	-51.9688635
\.


--
-- Name: totems_pkey; Type: CONSTRAINT; Schema: public; Owner: maiquel; Tablespace: 
--

ALTER TABLE ONLY totems
    ADD CONSTRAINT totems_pkey PRIMARY KEY (code);


--
-- Name: totems_un; Type: CONSTRAINT; Schema: public; Owner: maiquel; Tablespace: 
--

ALTER TABLE ONLY totems
    ADD CONSTRAINT totems_un UNIQUE (description_id);


--
-- Name: totem_log_ref_totem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maiquel
--

ALTER TABLE ONLY totem_log
    ADD CONSTRAINT totem_log_ref_totem_fkey FOREIGN KEY (ref_totem) REFERENCES totems(code);


--
-- Name: public; Type: ACL; Schema: -; Owner: maiquel
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM maiquel;
GRANT ALL ON SCHEMA public TO maiquel;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

