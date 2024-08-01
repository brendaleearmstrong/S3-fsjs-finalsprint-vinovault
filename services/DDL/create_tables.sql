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

-- Create Favourites table
CREATE TABLE IF NOT EXISTS Favourites (
    FavouriteID SERIAL PRIMARY KEY,
    LoginID INTEGER NOT NULL,
    WineID INTEGER NOT NULL,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_login FOREIGN KEY(LoginID) REFERENCES Logins(id) ON DELETE CASCADE,
    CONSTRAINT fk_wine FOREIGN KEY(WineID) REFERENCES Wine(WineID) ON DELETE CASCADE
);

-- Create Favourites table
CREATE TABLE IF NOT EXISTS Favourites (
    FavouriteID SERIAL PRIMARY KEY,
    LoginID INTEGER NOT NULL,
    WineID INTEGER NOT NULL,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_login FOREIGN KEY(LoginID) REFERENCES Logins(id) ON DELETE CASCADE,
    CONSTRAINT fk_wine FOREIGN KEY(WineID) REFERENCES Wine(WineID) ON DELETE CASCADE
);


-- Create Reviews table
CREATE TABLE IF NOT EXISTS Reviews (
    ReviewID SERIAL PRIMARY KEY,
    FavouriteID INTEGER NOT NULL,
    TastingNotes TEXT,
    ReviewText TEXT,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    DateReviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favourite FOREIGN KEY(FavouriteID) REFERENCES Favourites(FavouriteID) ON DELETE CASCADE
);

-- Add foreign key constraint for ReviewID in Favourites table
ALTER TABLE Favourites ADD CONSTRAINT fk_review FOREIGN KEY (ReviewID) REFERENCES Reviews (ReviewID) ON DELETE SET NULL;


-- Ensure the uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

