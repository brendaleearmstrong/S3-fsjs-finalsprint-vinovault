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