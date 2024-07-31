-- Table: public.Logins

-- DROP TABLE IF EXISTS public."Logins";

CREATE TABLE IF NOT EXISTS public."Logins"
(
    id serial NOT NULL,
    username character varying(12) COLLATE pg_catalog."default" NOT NULL,
    password character varying(80) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    uuid uuid NOT NULL,
    last_updated timestamp without time zone DEFAULT now(),
    CONSTRAINT "Logins_pkey" PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT unique_username UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Logins"
    OWNER to postgres;

-- Trigger: last_updated

-- DROP TRIGGER IF EXISTS last_updated ON public."Logins";

CREATE OR REPLACE TRIGGER last_updated
    BEFORE UPDATE 
    ON public."Logins"
    FOR EACH ROW
    EXECUTE FUNCTION public.last_updated();