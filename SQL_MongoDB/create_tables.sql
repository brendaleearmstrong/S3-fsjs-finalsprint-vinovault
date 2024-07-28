-- Create Users table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Role VARCHAR(20) NOT NULL CHECK (Role IN ('admin', 'user'))
);

-- Create Winery table
CREATE TABLE Winery (
    WineryID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Region VARCHAR(100),
    Country VARCHAR(100)
);

-- Create Wine table
CREATE TABLE Wine (
    WineID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    Description TEXT,
    WineryID INTEGER,
    FOREIGN KEY (WineryID) REFERENCES Winery(WineryID)
);

-- Create Favorites table
CREATE TABLE Favorites (
    FavoriteID SERIAL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    WineID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (WineID) REFERENCES Wine(WineID)
);