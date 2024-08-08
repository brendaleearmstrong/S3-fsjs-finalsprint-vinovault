-- Create the database
CREATE DATABASE vinovault;

-- Connect to the new database
\c vinovault;

-- Create the Wine table
CREATE TABLE IF NOT EXISTS Wine (
    WineID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Winery VARCHAR(255) NOT NULL,
    Region VARCHAR(255) NOT NULL,
    Country VARCHAR(255) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Price NUMERIC(10, 2) NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    Description TEXT,
    Logo VARCHAR(255)
);


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


-- Create the Reviews table
CREATE TABLE IF NOT EXISTS Reviews (
    ReviewID SERIAL PRIMARY KEY,
    TastingNotes TEXT,
    ReviewText TEXT,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    DateReviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    WineID INTEGER,
    CONSTRAINT fk_wine FOREIGN KEY(WineID) REFERENCES Wine(WineID) ON DELETE CASCADE
);

-- Add WineID column to Reviews table
ALTER TABLE Reviews ADD COLUMN WineID INTEGER;
ALTER TABLE Reviews ADD CONSTRAINT fk_wine FOREIGN KEY(WineID) REFERENCES Wine(WineID) ON DELETE CASCADE;

-- Ensure the uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM wine ORDER BY wineid DESC;

SELECT json_agg(row_to_json(wine)) AS wines_json
FROM wine;

-- Create Retailers table
CREATE TABLE IF NOT EXISTS Retailers (
    RetailerID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Inventory table
CREATE TABLE IF NOT EXISTS Inventory (
    InventoryID SERIAL PRIMARY KEY,
    RetailerID INTEGER NOT NULL,
    WineID INTEGER NOT NULL,
    Stock INTEGER NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_retailer FOREIGN KEY(RetailerID) REFERENCES Retailers(RetailerID) ON DELETE CASCADE,
    CONSTRAINT fk_wine FOREIGN KEY(WineID) REFERENCES Wine(WineID) ON DELETE CASCADE
);





