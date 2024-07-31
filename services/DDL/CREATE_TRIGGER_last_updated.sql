-- FUNCTION: public.last_updated()

-- DROP FUNCTION IF EXISTS public.last_updated();

CREATE OR REPLACE FUNCTION public.last_updated()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    NEW.last_update = CURRENT_TIMESTAMP;
    RETURN NEW;
END 
$BODY$;

ALTER FUNCTION public.last_updated()
    OWNER TO postgres;
