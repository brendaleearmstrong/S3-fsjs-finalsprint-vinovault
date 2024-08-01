-- Filtered Search Queries 
select * from wine;
select * from logins;
select * from favourites;
select * from reviews;

SELECT DISTINCT Winery FROM Wine ORDER BY Winery;
SELECT * FROM Wine WHERE Winery = $1;
SELECT * FROM Wine WHERE Winery = 'Robert Mondavi';

SELECT DISTINCT Type FROM Wine ORDER BY Type;
SELECT * FROM Wine WHERE Type = $1;
SELECT * FROM Wine WHERE Type = 'Cabernet Sauvignon';

SELECT DISTINCT Color FROM Wine ORDER BY Color;
SELECT * FROM Wine WHERE Color = $1;
SELECT * FROM Wine WHERE Color = 'Red';

SELECT DISTINCT Country FROM Wine ORDER BY Country;
SELECT * FROM Wine WHERE Country = $1;
SELECT * FROM Wine WHERE Country = 'Canada';

-- FAVOURITES DISPLAY --
SELECT 
    l.username,
    w.Name AS wine_name,
    w.Winery,
    w.Type,
    w.Color,
    w.Price,
    w.Rating AS wine_rating,
    w.Description,
    r.TastingNotes,
    r.ReviewText,
    r.Rating AS review_rating
FROM 
    Logins l
JOIN 
    Favourites f ON l.id = f.LoginID
JOIN 
    Wine w ON f.WineID = w.WineID
JOIN 
    Reviews r ON f.FavouriteID = r.FavouriteID
WHERE 
    l.username = 'user1';

-- FULL STRING QUERY SEARCH -- 
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
    Wine
WHERE 
    to_tsvector('english', Name || ' ' || Winery || ' ' || Region || ' ' || Country || ' ' || Type || ' ' || Color || ' ' || Description) @@ to_tsquery('english', $1);

-- With Example
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
    Wine
WHERE 
    to_tsvector('english', Name || ' ' || Winery || ' ' || Region || ' ' || Country || ' ' || Type || ' ' || Color || ' ' || Description) @@ to_tsquery('english', 'Cabernet & Sauvignon');
