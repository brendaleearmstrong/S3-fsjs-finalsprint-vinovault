-- Delete duplicates from the Favourites table
DELETE FROM Favourites
WHERE ctid NOT IN (
    SELECT min(ctid)
    FROM Favourites
    GROUP BY LoginID, WineID
);

-- Verify the duplicates have been removed
SELECT * FROM Favourites;