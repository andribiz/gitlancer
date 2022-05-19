CREATE DATABASE gitlancer
    WITH 
    OWNER = gitadmin
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;


CREATE TABLE public.users_profile
(
    id uuid,
    name character varying(100),
    email character varying(50),
    wallet character varying(50),
    PRIMARY KEY (id)
);

ALTER TABLE public.users_profile
    OWNER to gitadmin;
