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
