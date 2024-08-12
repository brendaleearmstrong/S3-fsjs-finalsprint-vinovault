# SD10 Semester 3 Final Sprint - Brenda Armstrong (Lead Developer) & Ethan Murphy

# VinoVault - Wine Search Engine

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Database Setup](#database-setup)
7. [Authentication and Authorization](#authentication-and-authorization)
8. [Search Functionality](#search-functionality)
9. [Vault Feature](#vault-feature)
10. [Future Feature: Reviews](#future-feature-reviews)
11. [API Endpoints](#api-endpoints)
12. [Testing](#testing)
13. [Data Generation](#data-generation)
14. [Dependencies](#dependencies)
15. [License](#license)
16. [Acknowledgments](#acknowledgments)

## Project Overview

VinoVault is a comprehensive wine search engine developed as part of the S3 Final Sprint for the FullStack and Database Combined course. It allows users to search for wines across multiple databases, providing a rich and interactive experience for wine enthusiasts.

**Repository:** [VinoVault GitHub Repository](https://github.com/brendaleearmstrong/S3-fsjs-finalsprint-vinovault)

## Features

1. **User Authentication**
   - Registration and Login functionality
   - JWT-based authentication
   - Stored in MongoDB

2. **Search Functionality**
   - Full-text search in both PostgreSQL and MongoDB
   - Filter search in PostgreSQL (by country, color, type)
   - Option to choose data source(s) for search

3. **Vault Feature**
   - Personal wine collection for logged-in users
   - Add wines from the vault - stored in MongoDB

4. **Future Feature: Reviews**
   - User-generated reviews for wines (planned for future implementation)
   - Review data is loaded in PG for future phase.

5. **Responsive Design**
   - User-friendly interface with CSS enhancements

6. **Logging**
   - Record of user search activities with timestamps and user IDs in Daily LogEvents file.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript templating) with CSS
- **Databases:** 
  - PostgreSQL for structured data and advanced filtering
  - MongoDB for flexible schema and full-text search capabilities
- **Authentication:** JSON Web Tokens (JWT)
- **Other Technologies:** bcrypt, uuid, dotenv

## Project Structure

```
vinovault/
├── logs/
│   └── [log files]
├── public/
│   ├── styles/
│   │   └── index.css
│   │   └── header.css
│   │   └── footer.css
│   │   └── auth.css
│   │   └── forms.css│
└── images/
│       └── [image files]
├── routes/
│   ├── api/
│   │   ├── auth.js
│   │   ├── index.js
│   │   └── fulltext.js
│   ├── auth.js
│   ├── search.js
│   └── vault.js
├── services/
│   ├── auth.js
│   ├── authMiddleware.js
│   ├── logEvents.js
│   ├── m.auth.dal.js
│   ├── m.db.js
│   ├── m.fulltext.dal.js
│   ├── p.auth.dal.js
│   ├── p.db.js
│   ├── p.fulltext.dal.js
│   ├── p.keywords.dal.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
|   |  └──  auth.ejs
│   ├── 404.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── search.ejs
│   └── vault.ejs
├── tests/
│   ├── user-testcases.js -- Read for Testing User Stories
│   ├── testDBConnection.js
│   ├── testFullSearch.js
│   └── testMDBConnection.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md

```
## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/brendaleearmstrong/S3-fsjs-finalsprint-vinovault.git
   cd S3-fsjs-finalsprint-vinovault
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
# PostgreSQL Configuration
POSTGRES_USER=vvadmin
POSTGRES_PASSWORD=vinovaultpw
POSTGRES_HOST=localhost
POSTGRES_DB=vinovault

# MongoDB Configuration
MONGO_URI=mongodb+srv://vinovaultadmin:vinovault2024@vinovault.tgtrtuv.mongodb.net/?retryWrites=true&w=majority&appName=vinovault

# Security Secrets
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

   ```

4. Start the application:
   ```
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Database Setup

### PostgreSQL
1. Create a new database named `vinovault`
2. Use the SQL scripts provided in the project to create necessary tables and insert data

### MongoDB
1. Create a new database named `vinovault`
2. Import the JSON data provided in the project into a `wines` collection

## Authentication and Authorization

VinoVault uses JWT for secure authentication. The process is handled in the `services/auth.js` and `services/authMiddleware.js` files.

## Search Functionality

### Full-text Search
- Available for both PostgreSQL and MongoDB
- Implemented in `services/p.fulltext.dal.js` and `services/m.fulltext.dal.js`
- Searches across multiple fields (name, winery, description, etc.)
- Users can choose to search in PostgreSQL or MongoDB (This is for demo purposes only to show DAL)

### Filter Search (PostgreSQL only)
- Allows filtering by country, color, type, etc.
- Implemented in `services/p.wine.dal.js`



## Extra Feature - The Wine Vault 

The Vault feature allows logged-in users to maintain a personal collection of favorite wines. This functionality is implemented in `routes/vault.js` and uses the database services to manage the user's wine collection.

## Future Feature: Reviews

A planned functionality to allow users to write and read reviews for wines. This feature will be implemented in future iterations of the project.

## API Endpoints

- **Authentication:**
  - `POST /auth/register`: User registration
  - `POST /auth/login`: User login
  - `GET /auth/logout`: User logout

- **Search:**
  - `GET /search`: Display search page
  - `POST /search`: Perform search and display results

- **Vault:**
  - `GET /vault`: Display user's wine vault
  - `POST /vault/add/:wineId`: Add a wine to the user's vault
  - `DELETE /vault/remove/:wineId`: Remove a wine from the user's vault

## Testing

The project includes several test files:

1. `testDBConnection.js`: Tests PostgreSQL connection
2. `testMDBConnection.js`: Tests MongoDB connection
3. `testFullSearch.js`: Tests full-text search in both databases

Run tests using:
```
### node testDBConnection.js
### node testMDBConnection.js
### node testFullSearch.js
```

## Data Generation

Wine data was generated using AI language models (Claude AI and ChatGPT) to create a diverse dataset of fictional wines.

## Dependencies

Key dependencies include:

- `express`: Web application framework
- `ejs`: Templating engine
- `pg`: PostgreSQL client
- `mongodb`: MongoDB driver
- `jsonwebtoken`: JWT implementation
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management

For a full list, see `package.json`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Claude AI and ChatGPT for data generation
- Course instructors for guidance and support
