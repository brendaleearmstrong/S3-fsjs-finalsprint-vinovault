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
    Wine.Name = 'WineNameHere';

-- Select data from the ReviewsByWineName view
SELECT * FROM ReviewsByWineName;

-- VIEW REVIEWS BY WINERY
-- View: public.reviewsbywinery
-- DROP VIEW public.reviewsbywinery;

CREATE OR REPLACE VIEW public.reviewsbywinery
 AS
 SELECT reviews.reviewid,
    reviews.tastingnotes,
    reviews.reviewtext,
    reviews.rating AS reviewrating,
    reviews.datereviewed,
    wine.name AS winename,
    wine.winery,
    wine.region,
    wine.country,
    wine.type,
    wine.color,
    wine.price,
    wine.rating AS winerating,
    wine.description,
    wine.logo
   FROM reviews
     JOIN wine ON reviews.wineid = wine.wineid
  WHERE wine.winery::text = 'Penfolds'::text;

ALTER TABLE public.reviewsbywinery
    OWNER TO postgres;