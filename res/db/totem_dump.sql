--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

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
-- Name: totems; Type: TABLE; Schema: public; Owner: maiquel
--

CREATE TABLE totems (
    code integer NOT NULL,
    description_id character varying(2044) NOT NULL,
    situation character varying(1),
    coordinates character varying(100),
    date_time timestamp DEFAULT now(),
    day_week varchar(20) DEFAULT to_char(current_date, 'day')
);


ALTER TABLE totems OWNER TO maiquel;

--
-- Data for Name: totems; Type: TABLE DATA; Schema: public; Owner: maiquel
--

INSERT INTO totems VALUES (3, 'Totem 3 - Praça do Chafariz', '0', NULL);
INSERT INTO totems VALUES (4, 'Totem 4 - SESC', '0', NULL);
INSERT INTO totems VALUES (1, 'Totem 1 - Shopping Lajeado', '0', NULL);
INSERT INTO totems VALUES (2, 'Totem 2 - HBB', '0', NULL);


--
-- Name: totems totems_pkey; Type: CONSTRAINT; Schema: public; Owner: maiquel
--

ALTER TABLE ONLY totems
    ADD CONSTRAINT totems_pkey PRIMARY KEY (code);


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

