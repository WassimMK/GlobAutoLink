**GlobAutoLink
A full-stack marketplace for the Algerian car market. I built this to handle specific local needs, particularly the "moins de 3 ans" (under 3 years) import regulation.

**Project Overview
The main goal was to create a platform where users can browse listings with filters that actually match Algerian laws. It includes a secure authentication system and a way for users to communicate with admins directly.

**Technical Details
Backend: Node.js and Express.js

Database: MySQL. I used mysql2 with connection pooling for better performance

Auth: Custom implementation using JWT (JSON Web Tokens) and bcryptjs for password hashing. Sessions are handled via HttpOnly cookies for better security

Frontend: Dynamic templates built with Handlebars (.hbs)

**Core Features
Filtered Search: SQL logic to filter cars based on the 3-year import rule.

User Accounts: Login, registration, and profile management.

Admin Panel: Dashboard to manage users, car ads, and support requests.

Support Chat: Real-time messaging between users and administrators.

**Folder Structure
/backend: All server-side logic, including controllers, routes, and middleware.

/database: Contains the globeautolink.sql file needed to set up the DB tables.

**Setup
Import database/globeautolink.sql into your MySQL server.

Configure your DB credentials in backend/config/database.js.

Run npm install in the backend directory.

Start the app with node app.js
