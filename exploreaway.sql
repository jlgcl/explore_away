--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
    ta_code character varying NOT NULL,
    coordinate double precision[]
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: daily_itinerary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_itinerary (
    username character varying(20) NOT NULL,
    city character varying(50) NOT NULL,
    address character varying NOT NULL,
    address_type character varying(20) NOT NULL,
    "time" character varying(35) NOT NULL
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

COPY public.cities (city, state, country, ta_code, coordinate) FROM stdin;
Shanghai	\N	China	ga308272	{31.2304,121.4737}
Paris	Ile de France	France	g187147	{48.8566,2.3522}
Berlin	\N	Germany	g187323	{52.52,13.405}
Bangkok	\N	Thailand	g293916	{13.7563,100.5018}
New York City	New York	USA	ga60763	{40.7129,-74.006}
London	\N	England	g186338	{51.5074,-0.1278}
Toronto	Ontario	Canada	g155019	{43.6532,-79.3832}
Johannesburg	Greater Johannesburg	South Africa	g312578	{-26.2041,28.0473}
San Francisco	California	USA	g60713	{37.779,-122.4199}
\.


--
-- Data for Name: daily_itinerary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daily_itinerary (username, city, address, address_type, "time") FROM stdin;
adg	London	Tower of London	attractions	4/13/2021, 9:33:00 PM
adg	London	The British Museum	attractions	4/13/2021, 9:44:00 PM
adg	New York City	Hotel 50 Bowery NYC	hotels	4/27/2021, 9:44:00 PM
adg	New York City	Marty's V Burger	restaurants	4/26/2021, 9:44:00 PM
luveberry	Toronto	Ripley's Aquarium of Canada	attractions	4/13/2021, 10:58:00 PM
luveberry	Toronto	New Orleans Seafood & Steakhouse	restaurants	4/21/2021, 10:58:00 PM
luveberry	Toronto	CN Tower	attractions	4/23/2021, 12:58:00 AM
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
2	test	asdf	2021-01-30 19:10:25	admin
52	adg	$2a$10$Wt//bzmz8KTjATpBecL8huYjz3i56xsITcF4VtRPwgdmbSAp8UJYO	2021-03-29 22:01:35	\N
56	luveberry	$2a$10$EXwrA7AAVuVhJ5Inrxm3wuzcc48JdjOWOTC2fFzSWCay2j2as8/9K	2021-04-06 21:57:31	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 56, true);


--
-- Name: daily_itinerary daily_itinerary_time_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_itinerary
    ADD CONSTRAINT daily_itinerary_time_key UNIQUE ("time");


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

