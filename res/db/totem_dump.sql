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
\.


--
-- Data for Name: totems; Type: TABLE DATA; Schema: public; Owner: maiquel
--

COPY totems (code, description_id, situation, latitude, longitude) FROM stdin;
3	Totem 3 - Praça do Chafariz	0	-29.46866093	-51.96386218
4	Totem 4 - SESC	0	-29.4694212	-51.9643181
2	Totem 2 - HBB	0	-29.46315	-51.966621
5	TESTE	1	12312312	0432342
6	TESTE Prith é bacana	1	12312312	0432342
1	Totem 2 - Shopping Lajeado	1	-29.4494285	-51.9688635
7	TOTEM	0	12345	123124
8	TOTEM	0	12345	123124
\.


--
-- Name: totems_pkey; Type: CONSTRAINT; Schema: public; Owner: maiquel; Tablespace: 
--

ALTER TABLE ONLY totems
    ADD CONSTRAINT totems_pkey PRIMARY KEY (code);


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

