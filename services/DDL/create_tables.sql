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

-- Preparing Wine for FullTextSearch
-- Preparing Wine for FullTextSearch
ALTER TABLE wine ADD COLUMN search_vector tsvector;

-- Update the search_vector to include Type and Color
UPDATE Wine
SET search_vector = to_tsvector('english', 
    coalesce(Name, '') || ' ' || 
    coalesce(Winery, '') || ' ' || 
    coalesce(Region, '') || ' ' || 
    coalesce(Country, '') || ' ' || 
    coalesce(Type, '') || ' ' || 
    coalesce(Color, '') || ' ' || 
    coalesce(Description, '')
);

-- Index for FullTextSearch
CREATE INDEX wine_search_idx ON Wine USING GIN(search_vector);
DROP FUNCTION IF EXISTS update_search_vector();

-- Function to update search_vector including Type and Color
CREATE FUNCTION update_search_vector() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', 
        coalesce(NEW.Name, '') || ' ' || 
        coalesce(NEW.Winery, '') || ' ' || 
        coalesce(NEW.Region, '') || ' ' || 
        coalesce(NEW.Country, '') || ' ' || 
        coalesce(NEW.Type, '') || ' ' || 
        coalesce(NEW.Color, '') || ' ' || 
        coalesce(NEW.Description, '')
    );
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Trigger to auto-update the search_vector column
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON Wine FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Check the updated data
SELECT WineID, Name, Winery, Region, Country, Type, Color, Description, search_vector
FROM Wine
LIMIT 10;

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


SELECT tgname, tgrelid::regclass, tgfoid::regprocedure
FROM pg_trigger
WHERE tgname = 'tsvectorupdate';

UPDATE Wine
SET Name = Name  -- Setting it to itself to trigger the update
WHERE WineID = 1;

UPDATE Wine
SET search_vector = to_tsvector('english', 
    coalesce(Name, '') || ' ' || 
    coalesce(Winery, '') || ' ' || 
    coalesce(Region, '') || ' ' || 
    coalesce(Country, '') || ' ' || 
    coalesce(Type, '') || ' ' || 
    coalesce(Color, '') || ' ' || 
    coalesce(Description, '')
);

SELECT WineID, search_vector
FROM Wine
LIMIT 10;



