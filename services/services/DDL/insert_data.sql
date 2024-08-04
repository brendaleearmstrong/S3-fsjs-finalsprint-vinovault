-- Insert sample data into Logins table
INSERT INTO Logins (username, password, email, uuid) VALUES
('user1', 'password1', 'user1@example.com', uuid_generate_v4()),
('user2', 'password2', 'user2@example.com', uuid_generate_v4()),
('user3', 'password3', 'user3@example.com', uuid_generate_v4()),
('user4', 'password4', 'user4@example.com', uuid_generate_v4()),
('user5', 'password5', 'user5@example.com', uuid_generate_v4());

-- Insert sample data into Favourites table
INSERT INTO Favourites (LoginID, WineID) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(5, 12),
(5, 13),
(5, 14),
(5, 15),
(5, 16);

-- Insert sample data into Reviews table
INSERT INTO Reviews (FavouriteID, TastingNotes, ReviewText, Rating) VALUES
(1, 'Fresh and crisp with notes of citrus.', 'A great wine for summer evenings.', 4),
(2, 'Bold and full-bodied with hints of oak.', 'Perfect with a steak dinner.', 5),
(3, 'Smooth and velvety with a hint of spice.', 'Excellent value for the price.', 4),
(4, 'Complex and flavorful with a long finish.', 'A truly exceptional wine.', 5),
(5, 'Rich and robust with dark fruit flavors.', 'A wine to savor.', 5),
(6, 'Bright and aromatic with tropical notes.', 'A delightful wine.', 4),
(7, 'Elegant and well-balanced with a smooth finish.', 'A fantastic wine.', 5),
(8, 'Full-bodied and rich with deep flavors.', 'An outstanding wine.', 5),
(9, 'Delicate and refined with a crisp finish.', 'A beautiful wine.', 4),
(10, 'Vibrant and refreshing with citrus notes.', 'A perfect wine for any occasion.', 4),
(11, 'Complex and layered with a long finish.', 'A wine that impresses.', 5),
(12, 'Bright and lively with fresh fruit flavors.', 'A refreshing wine.', 4),
(13, 'Smooth and elegant with a hint of sweetness.', 'A delightful wine.', 4),
(14, 'Rich and complex with a lingering finish.', 'A superb wine.', 5),
(15, 'Bold and intense with dark berry flavors.', 'A wine that stands out.', 5),
(16, 'Crisp and aromatic with floral notes.', 'A lovely wine.', 4);


UPDATE wine
SET logo = REPLACE(logo, '/images/', '')
WHERE logo LIKE '/images/%';

select * from wine;
select distinct winery from wine;


UPDATE wine
SET logo = CASE
    WHEN winery = 'Antinori' THEN 'antinori.png'
    WHEN winery = 'Henschke' THEN 'henschke.png'
    WHEN winery = 'Mission Hill' THEN 'mission_hill.png'
    WHEN winery = 'Barossa Valley Estate' THEN 'barossa_valley_estate.png'
    WHEN winery = 'Veuve Clicquot' THEN 'veuve_clicquot.png'
    WHEN winery = 'Moët & Chandon' THEN 'moet_chandon.png'
    WHEN winery = 'Marchesi di Barolo' THEN 'marchesi_di_barolo.png'
    WHEN winery = 'Robert Mondavi' THEN 'robert_mondavi.png'
    WHEN winery = 'Ridge Vineyards' THEN 'ridge_vineyards.png'
    WHEN winery = 'Tinhorn Creek' THEN 'tinhorn_creek.png'
    WHEN winery = 'Concha y Toro' THEN 'concha_y_toro.png'
    WHEN winery = 'Cloudy Bay' THEN 'cloudy_bay.png'
    WHEN winery = 'Catena Zapata' THEN 'catena_zapata.png'
    WHEN winery = 'Cave Spring' THEN 'cave_spring.png'
    WHEN winery = 'Chateau Ste. Michelle' THEN 'chateau_ste_michelle.png'
    WHEN winery = 'E. Guigal' THEN 'e_guigal.png'
    WHEN winery = 'Clos Apalta' THEN 'clos_apalta.png'
    WHEN winery = 'Beringer' THEN 'beringer.png'
    WHEN winery = 'Ornellaia' THEN 'ornellaia.png'
    WHEN winery = 'Torres' THEN 'torres.png'
    WHEN winery = 'Villa Maria' THEN 'villa_maria.png'
    WHEN winery = 'Château Margaux' THEN 'chateau_margaux.png'
    WHEN winery = 'Louis Roederer' THEN 'louis_roederer.png'
    WHEN winery = 'Penfolds' THEN 'penfolds.png'
    WHEN winery = 'Jackson-Triggs' THEN 'jackson_triggs.png'
    WHEN winery = 'Inniskillin' THEN 'inniskillin.png'
    WHEN winery = 'Domaine de la Romanée-Conti' THEN 'romanee_conti.png'
    WHEN winery = 'Duckhorn' THEN 'duckhorn.png'
    WHEN winery = 'Silver Oak' THEN 'silver_oak.png'
    ELSE logo  -- Keep the original logo if no match is found
END
WHERE winery IN (
    'Antinori', 'Henschke', 'Mission Hill', 'Barossa Valley Estate', 'Veuve Clicquot', 'Moët & Chandon', 
    'Marchesi di Barolo', 'Robert Mondavi', 'Ridge Vineyards', 'Tinhorn Creek', 'Concha y Toro', 'Cloudy Bay', 
    'Catena Zapata', 'Cave Spring', 'Chateau Ste. Michelle', 'E. Guigal', 'Clos Apalta', 'Beringer', 
    'Ornellaia', 'Torres', 'Villa Maria', 'Château Margaux', 'Louis Roederer', 'Penfolds', 'Jackson-Triggs', 
    'Inniskillin', 'Domaine de la Romanée-Conti', 'Duckhorn', 'Silver Oak'
);
