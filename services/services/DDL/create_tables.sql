-- Create Wine table
CREATE TABLE Wine (
    WineID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
	Winery character varying(100),
	Region VARCHAR(100),
    Country VARCHAR(100),
	Type VARCHAR(50) NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    Description TEXT,
    Logo character varying(255)
);

-- Create Logins table
CREATE TABLE IF NOT EXISTS Logins (
    id serial NOT NULL,
    username character varying(12) COLLATE pg_catalog."default" NOT NULL,
    password character varying(80) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    uuid uuid NOT NULL,
    last_updated timestamp without time zone DEFAULT now(),
    CONSTRAINT "Logins_pkey" PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT unique_username UNIQUE (username)
);

-- Ensure the owner of the table is set
ALTER TABLE IF EXISTS public."Logins"
    OWNER to vinovaultadmin;

-- Create Reviews table
CREATE TABLE IF NOT EXISTS Reviews (
    ReviewID SERIAL PRIMARY KEY,
    TastingNotes TEXT,
    ReviewText TEXT,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    DateReviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favourite FOREIGN KEY(FavouriteID) REFERENCES Favourites(FavouriteID) ON DELETE CASCADE
);

-- Ensure the uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM wine ORDER BY wineid DESC;

SELECT json_agg(row_to_json(wine)) AS wines_json
FROM wine;


