# BOOK API
| a simple crud of book with auth created by zikri akmal for test assessment purpose


## INSTALLATION 
- clone this repository  https://github.com/zikriakmal/express-ts-prisma-test-assesment
- npm i
- cp .env.example to .env
- config your .env with correct configuration in the host, port, db_url, and jwt_secret
- make sure db is created with correct name
- npx prisma migrate dev --name init
- npm run seed 

## RUNNING THE APP (IN DEVELOPMENT)
- npm run start 

## BUILD DISTRIBUTION JS APP
- npm run build

## RUN DISTRIBUTION APP
- npm run serve

## SEEDING THE INITIAL DATA
- go to src/database/seeder/index.ts
- add seed data if needed
- npm run seed

# Database Schema Description

### User Table

### Columns:
- **id**: Primary key, auto-incrementing integer.
- **username**: Unique string representing the username.
- **password**: String to store user passwords.
- **createdAt**: Timestamp when the user was created (default to `now()`).
- **updatedAt**: Timestamp when the user was last updated (automatically set).

### Relations:
- Has a one-to-many relationship with `Book` (a user can have many books).
- Has a one-to-many relationship with `Log` (a user can have many logs).

### Book Table

### Columns:
- **id**: Primary key, auto-incrementing integer.
- **title**: String representing the title of the book.
- **authorName**: String representing the author of the book.
- **publisherName**: String representing the publisher of the book.
- **userId**: Foreign key referencing the `id` column in the `User` table.
- **createdAt**: Timestamp when the book was created (default to `now()`).
- **updatedAt**: Timestamp when the book was last updated (automatically set).

### Relations:
- Belongs to the `User` table (one user can have many books).

### Log Table

### Columns:
- **id**: Primary key, auto-incrementing integer.
- **action**: String representing the action performed (e.g., create, update, delete).
- **model**: String representing the model affected (e.g., Book, User).
- **recordId**: Integer representing the ID of the affected record.
- **oldData**: JSON object storing the previous data (nullable).
- **newData**: JSON object storing the new data (nullable).
- **userId**: Foreign key referencing the `id` column in the `User` table.
- **createdAt**: Timestamp when the log entry was created (default to `now()`).
- **updatedAt**: Timestamp when the log entry was last updated (automatically set).

### Relations:
- Belongs to the `User` table (one user can have many logs).


### ERD
| find ERD in docs/erd/ERD.png

### POSTMAN COLLECTION
| find postman collection in docs/postman_collection

### SWAGGER BUILT IN
| access the api documentation directly with ${host:port}/api-docs