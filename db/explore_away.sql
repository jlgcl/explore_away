--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    city character varying NOT NULL,
    state character varying,
    country character varying NOT NULL,
    ta_code character varying NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: daily_itinerary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_itinerary (
    username character varying(20) NOT NULL,
    city character varying(50) NOT NULL,
    address character varying NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    address_type character varying(20) NOT NULL
);


ALTER TABLE public.daily_itinerary OWNER TO postgres;

--
-- Name: travel_route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.travel_route (
    username character varying(20) NOT NULL,
    city character varying(50) NOT NULL,
    arrival_date date NOT NULL,
    departure_date date NOT NULL
);


ALTER TABLE public.travel_route OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    privilege character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (city, state, country, ta_code) FROM stdin;
New York City	New York	USA	ga60763
Tokyo	Kanto	Japan	ga298184
Shanghai	\N	China	ga308272
London	\N	England	g186338
Paris	Ile de France	France	g187147
Berlin	\N	Germany	g187323
Bangkok	\N	Thailand	g293916
Johannesburg	Greater Johannesburg	South Africa	g312578
San Francisco	California	USA	g60713
Toronto	Ontario	Canada	g155019
\.


--
-- Data for Name: daily_itinerary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daily_itinerary (username, city, address, start_time, end_time, address_type) FROM stdin;
admin	New York City	Statue of Liberty	08:00:00	12:00:00	Attractions
\.


--
-- Data for Name: travel_route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.travel_route (username, city, arrival_date, departure_date) FROM stdin;
admin	New York City	2020-03-15	2020-03-20
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, created_on, privilege) FROM stdin;
4	test2	asdf	2021-02-01 19:10:25	\N
2	test	asdf	2021-01-30 19:10:25	admin
6	test5	$2a$10$mIo95X7WSwpqXFQAQCV0m.RSWAKM7OLrYJo1GE.WVfzEdEc7dGWmO	2021-02-03 21:42:57	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

