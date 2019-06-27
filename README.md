
**Notes to the Treehouse reviewer** 
* The project includes 'Extra Credit' functionality for 'Exceeds Expectations' grade


# Installing the REST API

1. In a terminal window navigate to the project folder, then to the api folder.
2. Install npm modules with the command ```npm install```.
3. Create the database with the command ```npm run seed```.
The database will be populated with two users and three courses. 

## Resetting the database
To reset database to its seed data
1. Stop the server with ctrl-C in the terminal window.
2. Delete the file fsjstd-restapi.db.
3. Recreate the database with the command ```npm run seed```.
4. Restart the application server with the command ```npm start```

# Starting the application
1. In a terminal windown and navigate to the project folder, then to the api folder.
2. Enter the command ```npm start```.
If the application starts successfully the following messages appear in the console
```
Express server is listening on port 5000
Executing (default): SELECT 1+1 AS result
Connected to database
```

# Routes

**User Authentication**

Some routes require user authenication which expect the request has an Authorization header of type Basic Auth with the user email and plaintext password. (Unencrypted passwords for the seed users can be found in /seed/data.json.) Authenication failures return status 401 with a body containing the message "Access Denied" and a warning to the console (ex: "basic auth expected", "user not found").

**GET /** (root)

Welcome message
* User authentication is not required.
* Returns status 200.
* Response body returns a welcome message named "message".

**GET /api/users**

Get the current authenticated user
* User authentication is required.
* If credentials are valid:
  * Status 200 is returned
  * Response body returns the user record 
  * User record excludes the fields password, createdAt, updatedAt

**POST /api/users**

Create a user
* User authentication is not required.
* The request body content is validated:
  * firstName, lastName, emailAddress, password fields are required and not null
  * emailAddress is a valid email format
  * emailAddress is not already on another user record
* When request body validation **passes**:
  * A user record is created
  * Status 201 is returned
  * Response header Location is set to "/". 
  * Response body returns no content.
* When request body validatation **fails**:
  * Status 400 is returned
  * Response body contains an array named "errors" containing strings describing the validation errors

**GET /api/courses**

Get a list of all courses
* User authentication is not required.
* Status 200 is returned
* Response body contains an array named "courses" containing all course records and associated users
  * Course records exclude the fields: createdAt, updatedAt
  * User records exclude the fields password, createdAt, updatedAt

**GET /api/courses/:id**

Get a course
* User authentication is not required
* Status 200 is returned
* Response body contains an array named "course" containing the course and associated user where courses.id is the route :id
  * Course record excludes the fields: createdAt, updatedAt
  * User record excludes the fields password, createdAt, updatedAt

**POST /api/courses**

Create a new course associated with an existing user record
* User authentication is required
* The request body is validated:
  * title, description and userId are required and not null
  * userId converts to an integer and is a key to an existing user
* When request body validation **passes**:
  * A course record is created
  * Status 201 is returned
  * Response header Location is set to "/api/courses/" + the new course id
  * Response body returns no content
* When request body validatation **fails**:
  * Status 400 is returned
  * Response body contains an array named "errors" containing strings describing the validation errors

**PUT /api/courses/:id**

Update an existing course
* User authentication is required
* The request body is validated:
  * title and description are required and cannot be null
  * the currently authenticated user must match course userId 
* When request body validation **passes**:
  * The course record is updated with the fields in the request. _Note that any update to userId is ignored._
  * Status 204 is returned
  * Response body returns no content
* When request body validatation **fails**:
  * Status 400 is returned
  * Response body contains an array named "errors" containing strings describing the validation errors

**DELETE /api/courses/:id**

Delete a course
* User authentication is required
* The request is validated:
  * the currently authenticated user must match course userId 
* When request body validation **passes**:
  * The course record is deleted.
  * Status 204 is returned
  * Response body returns no content
* When request body validatation **fails**:
  * Status 400 is returned
  * Response body contains an array named "errors" containing strings describing the validation errors

# Project Structure

## Primary packages

* react: frontend web page handler
* sqlite: database
* sequelize: database ORM
* express: backend route handler

## File structure

### root-level
* api/ - REST API service
* client/ - web app React
* mockups/ - page layouts from project instructions
* README.md - this file

### api folder
The REST API service

**Primary files**
* app.js: main script
* fsjstd-restapi.db: database
* \models: sequelize models for database tables

* \routes: code for URLs
* \support: internal support functions, such as authenticateUser

**Other**
* \config: sequelize database connection parameters
* \node_modules: external packages (ex: sequelize, sqlite )
* \seed: database creation and populating scripts
* nodemon.json: node configuration
* package-lock.json: npm package configuration
* package.json: npm package configuration
* RESTAPI.postman_collection.json: Postman test scripts

### client folder
The web app front in in React


# === ORIGINAL NOTES FROM STARTER FILES ===

# Full Stack JavaScript Techdegree v2 - REST API Project

## Overview of the Provided Project Files

We've supplied the following files for you to use: 

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).
