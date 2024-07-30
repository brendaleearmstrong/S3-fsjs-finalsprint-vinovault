-- Add logo column to the winery table
ALTER TABLE winery ADD COLUMN IF NOT EXISTS logo VARCHAR(255);

-- Add winery_logo column to the wines table
ALTER TABLE wine ADD COLUMN IF NOT EXISTS winery_logo VARCHAR(255);

-- Create a function to update the winery_logo column in the wine table
CREATE OR REPLACE FUNCTION update_winery_logo()
RETURNS TRIGGER AS $$
BEGIN
    NEW.winery_logo := (SELECT logo FROM winery WHERE name = NEW.winery);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before inserting or updating wines
CREATE TRIGGER set_winery_logo
BEFORE INSERT OR UPDATE ON wine
FOR EACH ROW
EXECUTE FUNCTION update_winery_logo();
