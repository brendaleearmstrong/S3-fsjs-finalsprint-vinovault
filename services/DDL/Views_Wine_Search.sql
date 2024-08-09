-- Drop existing views if they exist
DROP VIEW IF EXISTS AllReviews;
DROP VIEW IF EXISTS ReviewsByWinery;
DROP VIEW IF EXISTS ReviewsByWineName;
DROP VIEW IF EXISTS WineByType;
DROP VIEW IF EXISTS WineByWinery;
DROP VIEW IF EXISTS WineByCountry;

-- Create view for AllReviews
CREATE VIEW AllReviews AS
SELECT 
    Reviews.ReviewID,
    Reviews.TastingNotes,
    Reviews.ReviewText,
    Reviews.Rating AS ReviewRating,
    Reviews.DateReviewed,
    Wine.Name AS WineName,
    Wine.Winery,
    Wine.Region,
    Wine.Country,
    Wine.Type,
    Wine.Color,
    Wine.Price,
    Wine.Rating AS WineRating,
    Wine.Description,
    Wine.Logo
FROM 
    Reviews
JOIN 
    Wine ON Reviews.WineID = Wine.WineID;

-- Create view for ReviewsByWinery
CREATE VIEW ReviewsByWinery AS
SELECT 
    Reviews.ReviewID,
    Reviews.TastingNotes,
    Reviews.ReviewText,
    Reviews.Rating AS ReviewRating,
    Reviews.DateReviewed,
    Wine.Name AS WineName,
    Wine.Winery,
    Wine.Region,
    Wine.Country,
    Wine.Type,
    Wine.Color,
    Wine.Price,
    Wine.Rating AS WineRating,
    Wine.Description,
    Wine.Logo
FROM 
    Reviews
JOIN 
    Wine ON Reviews.WineID = Wine.WineID
WHERE 
    Wine.Winery = 'Penfolds';

-- Create view for ReviewsByWineName
CREATE VIEW ReviewsByWineName AS
SELECT 
    Reviews.ReviewID,
    Reviews.TastingNotes,
    Reviews.ReviewText,
    Reviews.Rating AS ReviewRating,
    Reviews.DateReviewed,
    Wine.Name AS WineName,
    Wine.Winery,
    Wine.Region,
    Wine.Country,
    Wine.Type,
    Wine.Color,
    Wine.Price,
    Wine.Rating AS WineRating,
    Wine.Description,
    Wine.Logo
FROM 
    Reviews
JOIN 
    Wine ON Reviews.WineID = Wine.WineID
WHERE 
    Wine.Name = 'Penfolds Grange 2016';

-- Create view for WineByType
CREATE VIEW WineByType AS
SELECT 
    WineID,
    Name,
    Winery,
    Region,
    Country,
    Type,
    Color,
    Price,
    Rating,
    Description,
    Logo
FROM 
    Wine;

-- Select statement to view wines by type
-- Replace 'TypeHere' with the actual wine type 
SELECT * FROM WineByType WHERE Type = 'Chardonnay';

-- Create view for WineByWinery
CREATE VIEW WineByWinery AS
SELECT 
    WineID,
    Name,
    Winery,
    Region,
    Country,
    Type,
    Color,
    Price,
    Rating,
    Description,
    Logo
FROM 
    Wine;
	
-- Select statement to view wines by winery
-- Replace 'WineryNameHere' with the actual winery name
SELECT * FROM WineByWinery WHERE Winery = 'Penfolds';

-- Create view for WineByCountry
CREATE VIEW WineByCountry AS
SELECT 
    WineID,
    Name,
    Winery,
    Region,
    Country,
    Type,
    Color,
    Price,
    Rating,
    Description,
    Logo
FROM 
    Wine;
	
-- Select statement to view wines by country
-- Replace 'CountryNameHere' with the actual country name
SELECT * FROM WineByCountry WHERE Country = 'Canada';
