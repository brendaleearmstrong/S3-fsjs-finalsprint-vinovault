CREATE OR REPLACE VIEW AllWines AS
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
    Logo,
    search_vector
FROM 
    Wine;
