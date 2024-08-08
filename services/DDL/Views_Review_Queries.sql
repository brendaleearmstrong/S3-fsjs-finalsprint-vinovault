-- View All Reviews

DROP VIEW IF EXISTS AllReviews;
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
	
--- View Reviews by Winery

DROP VIEW IF EXISTS ReviewsByWinery;

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
	
-- View Reviews by Wine Name

DROP VIEW IF EXISTS ReviewsByWineName;

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
    Wine.Name = 'Penfolds Bin 389';
