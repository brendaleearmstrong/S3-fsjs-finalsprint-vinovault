-- Insert 50 tailored reviews into the Reviews table using valid WineID values from the provided list
INSERT INTO Reviews (TastingNotes, ReviewText, Rating, WineID) VALUES
-- Reviews for Red Wines
('Rich and full-bodied with notes of blackberry and cassis.', 'An outstanding Cabernet Sauvignon, perfect for any occasion. Excellent!', 5, 301),
('Smooth and velvety with hints of plum and chocolate.', 'A delicious Merlot with a smooth finish. Excellent!', 5, 333),
('Bold and spicy with flavors of black pepper and cherry.', 'A robust Zinfandel, very bold and spicy. Excellent!', 5, 318),
('Complex and layered with dark fruit and tobacco notes.', 'An exceptional Shiraz, full of complexity and depth. Excellent!', 5, 335),
('Elegant and refined with red berry and floral notes.', 'A prestigious Pinot Noir, very rich and luxurious. Excellent!', 5, 380),
('Full-bodied with rich flavors of dark cherry and oak.', 'A robust Malbec, very rich and flavorful. Excellent!', 5, 315),
('Deep and intense with notes of dark fruit and spice.', 'A bold Cabernet Sauvignon, perfect for a special dinner. Excellent!', 5, 407),
('Smooth and balanced with flavors of red berries and vanilla.', 'A delightful Merlot, very smooth and enjoyable. Excellent!', 5, 343),
('Rich and robust with hints of black pepper and chocolate.', 'An outstanding Shiraz, full of depth and complexity. Excellent!', 5, 337),
('Elegant and refined with layers of cherry and oak.', 'A luxurious Pinot Noir, very elegant. Excellent!', 5, 380),
('Bold and flavorful with notes of blackberry and tobacco.', 'A robust Cabernet Sauvignon, perfect for any occasion. Excellent!', 5, 304),
('Smooth and velvety with hints of dark fruit and spice.', 'A delicious Merlot with a smooth finish. Excellent!', 5, 343),
('Complex and layered with notes of plum and chocolate.', 'An exceptional Shiraz, full of depth and richness. Excellent!', 5, 335),
('Elegant and refined with hints of red berries and oak.', 'A prestigious Pinot Noir, very luxurious. Excellent!', 5, 321),
('Full-bodied with rich flavors of dark cherry and spice.', 'A robust Malbec, very rich and flavorful. Excellent!', 5, 419),
('Deep and intense with notes of dark fruit and tobacco.', 'A bold Cabernet Sauvignon, perfect for a special dinner. Excellent!', 5, 304),
('Smooth and balanced with flavors of red berries and vanilla.', 'A delightful Merlot, very smooth and enjoyable. Excellent!', 5, 351),
('Rich and robust with hints of black pepper and chocolate.', 'An outstanding Shiraz, full of depth and complexity. Excellent!', 5, 429),
('Elegant and refined with layers of cherry and oak.', 'A luxurious Pinot Noir, very elegant. Excellent!', 5, 425),
('Bold and flavorful with notes of blackberry and tobacco.', 'A robust Cabernet Sauvignon, perfect for any occasion. Excellent!', 5, 301),

-- Reviews for White Wines
('Crisp and refreshing with notes of green apple and pear.', 'A delightful Chardonnay, perfect for a summer day. Good!', 4, 340),
('Bright and zesty with hints of lemon and lime.', 'A vibrant Sauvignon Blanc, very refreshing. Good!', 4, 306),
('Smooth and buttery with flavors of vanilla and toast.', 'A rich and creamy Chardonnay, very enjoyable. Good!', 4, 340),
('Elegant and aromatic with peach and floral notes.', 'A beautifully crafted Chardonnay, very elegant. Good!', 4, 311),
('Fresh and crisp with citrus and mineral notes.', 'A refreshing Pinot Grigio, perfect for any occasion. Good!', 4, 408),
('Bright and zesty with notes of citrus and tropical fruit.', 'A vibrant Sauvignon Blanc, very refreshing. Good!', 4, 312),
('Smooth and buttery with hints of vanilla and oak.', 'A rich and creamy Chardonnay, very enjoyable. Good!', 4, 303),
('Elegant and aromatic with layers of peach and floral notes.', 'A beautifully crafted Chardonnay, very elegant. Good!', 4, 296),
('Fresh and crisp with notes of citrus and green apple.', 'A delightful Pinot Grigio, perfect for a summer day. Good!', 4, 408),
('Bright and zesty with hints of lime and tropical fruit.', 'A vibrant Sauvignon Blanc, very refreshing. Good!', 4, 306),
('Smooth and buttery with flavors of vanilla and toast.', 'A rich and creamy Chardonnay, very enjoyable. Good!', 4, 340),
('Elegant and aromatic with notes of peach and floral.', 'A beautifully crafted Chardonnay, very elegant. Good!', 4, 311),
('Fresh and crisp with hints of citrus and mineral.', 'A refreshing Pinot Grigio, perfect for any occasion. Good!', 4, 408),
('Bright and zesty with notes of lemon and lime.', 'A vibrant Sauvignon Blanc, very refreshing. Good!', 4, 312),
('Smooth and buttery with hints of vanilla and oak.', 'A rich and creamy Chardonnay, very enjoyable. Good!', 4, 303),
('Elegant and aromatic with layers of peach and floral.', 'A beautifully crafted Chardonnay, very elegant. Good!', 4, 296),
('Fresh and crisp with notes of citrus and green apple.', 'A delightful Pinot Grigio, perfect for a summer day. Good!', 4, 352),
('Bright and zesty with hints of lime and tropical fruit.', 'A vibrant Sauvignon Blanc, very refreshing. Good!', 4, 306),
('Smooth and buttery with flavors of vanilla and toast.', 'A rich and creamy Chardonnay, very enjoyable. Good!', 4, 344),
('Elegant and aromatic with notes of peach and floral.', 'A beautifully crafted Chardonnay, very elegant. Good!', 4, 296),

-- Reviews for Sparkling Wines (Champagne)
('Luxurious with complex flavors of brioche and apricot.', 'A luxurious Champagne, truly exquisite. Excellent!', 5, 7),
('Delicate and elegant with fine bubbles and citrus notes.', 'A refined Champagne, very elegant. Excellent!', 5, 7),
('Refreshing with vibrant flavors of green apple and lemon.', 'A crisp and refreshing Champagne, perfect for celebrations. Good!', 4, 415),
('Luxurious with layers of brioche and tropical fruit.', 'A rich and complex Champagne, very exquisite. Excellent!', 5, 313),
('Delicate and refined with hints of citrus and floral.', 'A beautifully crafted Champagne, very elegant. Excellent!', 5, 313),
('Refreshing and crisp with notes of green apple and citrus.', 'A delightful Champagne, perfect for any celebration. Good!', 4, 308),
('Luxurious and complex with flavors of brioche and apricot.', 'An exquisite Champagne, truly luxurious. Excellent!', 5, 310),
('Delicate and elegant with fine bubbles and citrus.', 'A refined Champagne, very elegant. Excellent!', 5, 307),
('Refreshing with vibrant notes of green apple and lemon.', 'A crisp and refreshing Champagne, perfect for celebrations. Good!', 4, 367),
('Luxurious with layers of brioche and tropical fruit.', 'A rich and complex Champagne, very exquisite. Excellent!', 5, 308),
('Delicate and refined with hints of citrus and floral.', 'A beautifully crafted Champagne, very elegant. Excellent!', 5, 310),
('Refreshing and crisp with notes of green apple and citrus.', 'A delightful Champagne, perfect for any celebration. Good!', 4, 367),
('Luxurious and complex with flavors of brioche and apricot.', 'An exquisite Champagne, truly luxurious. Excellent!', 5, 415),
('Delicate and elegant with fine bubbles and citrus.', 'A refined Champagne, very elegant. Excellent!', 5, 309),
('Refreshing with vibrant notes of green apple and lemon.', 'A crisp and refreshing Champagne, perfect for celebrations. Good!', 4, 307),
('Luxurious with layers of brioche and tropical fruit.', 'A rich and complex Champagne, very exquisite. Excellent!', 5, 313),
('Delicate and refined with hints of citrus and floral.', 'A beautifully crafted Champagne, very elegant. Excellent!', 5, 309),
('Refreshing and crisp with notes of green apple and citrus.', 'A delightful Champagne, perfect for any celebration. Good!', 4, 368),
('Luxurious and complex with flavors of brioche and apricot.', 'An exquisite Champagne, truly luxurious. Excellent!', 5, 310),
('Delicate and elegant with fine bubbles and citrus.', 'A refined Champagne, very elegant. Excellent!', 5, 313);

-- Insert additional reviews for all Penfolds wines
INSERT INTO Reviews (TastingNotes, ReviewText, Rating, WineID) VALUES
('Complex and rich with layers of dark fruit and spice.', 'An exceptional Shiraz, perfect for special occasions. Excellent!', 5, 9), -- Penfolds Grange
('Balanced and smooth with flavors of blackberry and oak.', 'A delightful Cabernet Shiraz blend, very well-balanced. Excellent!', 5, 298), -- Penfolds Bin 389
('Elegant and refined with red berry and vanilla notes.', 'A prestigious Cabernet Sauvignon, truly luxurious. Excellent!', 5, 355), -- Penfolds Cabernet Sauvignon
('Bright and vibrant with hints of lime and tropical fruit.', 'A delightful Chardonnay, perfect for summer days. Good!', 4, 356), -- Penfolds Chardonnay

('Deep and complex with notes of blackberry and spice.', 'An outstanding Shiraz, full of complexity. Excellent!', 5, 297), -- Penfolds Grange
('Smooth and balanced with flavors of dark fruit and oak.', 'A rich Cabernet Shiraz blend, very enjoyable. Excellent!', 5, 298), -- Penfolds Bin 389
('Elegant with layers of red fruit and subtle oak.', 'A refined Cabernet Sauvignon, very elegant. Excellent!', 5, 355), -- Penfolds Cabernet Sauvignon
('Crisp and refreshing with hints of green apple and citrus.', 'A vibrant Chardonnay, very refreshing. Good!', 4, 356), -- Penfolds Chardonnay

('Rich and bold with notes of dark berries and pepper.', 'A powerful Shiraz, perfect for a special dinner. Excellent!', 5, 9), -- Penfolds Grange
('Balanced with flavors of dark berries and subtle spice.', 'A well-crafted Cabernet Shiraz blend, very balanced. Excellent!', 5, 298), -- Penfolds Bin 389
('Refined with notes of red fruit and delicate oak.', 'A prestigious Cabernet Sauvignon, very luxurious. Excellent!', 5, 355), -- Penfolds Cabernet Sauvignon
('Bright and crisp with flavors of citrus and tropical fruits.', 'A delightful Chardonnay, perfect for warm days. Good!', 4, 356); -- Penfolds Chardonnay

INSERT INTO Reviews (TastingNotes, ReviewText, Rating, WineID) VALUES
-- Reviews for Penfolds Wines
('Overly tannic with a harsh finish.', 'The Shiraz was too strong and lacked balance. Bad!', 2, 9), -- Penfolds Grange
('Lacks complexity and depth.', 'The Cabernet Shiraz blend was underwhelming. Ok.', 3, 298), -- Penfolds Bin 389
('Too oaky with a bitter aftertaste.', 'The Cabernet Sauvignon was not enjoyable. Bad!', 2, 355), -- Penfolds Cabernet Sauvignon
('Flat and lacking flavor.', 'The Chardonnay was disappointing. Bad!', 2, 356), -- Penfolds Chardonnay

-- Reviews for Other Wines
('Bland with minimal flavor.', 'The Sauvignon Blanc was not refreshing. Ok.', 3, 306), -- Duckhorn Vineyards Sauvignon Blanc
('Too acidic and harsh.', 'The Riesling was overly sharp and not pleasant. Bad!', 2, 334), -- Chateau Ste. Michelle Riesling
('Lacks character and depth.', 'The Merlot was quite boring. Ok.', 3, 333), -- Chateau Ste. Michelle Merlot
('Overpowering oak with a dry finish.', 'The Chardonnay was too oaky and dry. Bad!', 2, 311), -- Villa Maria Private Bin Chardonnay
('Too sweet with an unbalanced flavor.', 'The Icewine was overly sweet and lacked balance. Ok.', 3, 341); -- Inniskillin Riesling Icewine

-- Insert 20 additional ok and bad reviews into the Reviews table for various wines
INSERT INTO Reviews (TastingNotes, ReviewText, Rating, WineID) VALUES
('Lacks complexity and depth.', 'The Cabernet Sauvignon was underwhelming. Ok.', 3, 407), -- Robert Mondavi Winery Cabernet
('Too sweet and lacks balance.', 'The Zinfandel was overly sweet and lacked structure. Bad!', 2, 350), -- Robert Mondavi Winery Zinfandel
('Bland with minimal flavor.', 'The Merlot was not exciting and rather dull. Ok.', 3, 292), -- Robert Mondavi Winery Merlot
('Too acidic and sharp.', 'The Sauvignon Blanc was overly tart and not enjoyable. Bad!', 2, 352), -- Silver Oak Cellars Sauvignon Blanc
('Lacks character and body.', 'The Chardonnay was quite boring and unremarkable. Ok.', 3, 294), -- Silver Oak Cellars Chardonnay
('Overly tannic with a harsh finish.', 'The Cabernet Sauvignon was too strong and unbalanced. Bad!', 2, 293), -- Silver Oak Cellars Cabernet Sauvignon
('Too oaky with a bitter aftertaste.', 'The Pinot Noir was not enjoyable. Bad!', 2, 361), -- Beringer Vineyards Pinot Noir
('Flat and lacking flavor.', 'The Sauvignon Blanc was disappointing and bland. Ok.', 3, 362), -- Beringer Vineyards Sauvignon Blanc
('Bland with minimal flavor.', 'The Malbec lacked depth and complexity. Ok.', 3, 315), -- Catena Zapata Adrianna Vineyard Malbec
('Too acidic and harsh.', 'The Chardonnay was overly sharp and not pleasant. Bad!', 2, 316), -- Catena Zapata White Stones Chardonnay
('Lacks complexity and depth.', 'The Merlot was underwhelming and dull. Ok.', 3, 343), -- Jackson-Triggs Grand Reserve Merlot
('Too sweet and unbalanced.', 'The Icewine was overly sweet and not enjoyable. Bad!', 2, 341), -- Inniskillin Riesling Icewine
('Bland with minimal flavor.', 'The Gewürztraminer was not exciting and rather dull. Ok.', 3, 345), -- Tinhorn Creek Gewürztraminer
('Too oaky with a bitter aftertaste.', 'The Chardonnay was not enjoyable. Bad!', 2, 344), -- Jackson-Triggs Grand Reserve Chardonnay
('Flat and lacking flavor.', 'The Cabernet Franc was disappointing and bland. Ok.', 3, 347), -- Cave Spring Cellars Cabernet Franc
('Too acidic and sharp.', 'The Riesling was overly tart and not enjoyable. Bad!', 2, 334), -- Chateau Ste. Michelle Riesling
('Lacks character and body.', 'The Merlot was quite boring and unremarkable. Ok.', 3, 333), -- Chateau Ste. Michelle Merlot
('Overly tannic with a harsh finish.', 'The Syrah was too strong and unbalanced. Bad!', 2, 430), -- E. Guigal Côte-Rôtie
('Too oaky with a bitter aftertaste.', 'The Chardonnay was not enjoyable. Bad!', 2, 40), -- Château Montelena Napa Valley Chardonnay
('Flat and lacking flavor.', 'The Sauvignon Blanc was disappointing and bland. Ok.', 3, 306); -- Duckhorn Vineyards Sauvignon Blanc

select * from reviews;
