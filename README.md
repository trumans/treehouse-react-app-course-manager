
**Notes to the Treehouse reviewer**
* User authentication is persisted in the Context component and a browser cookie. The user email and password are encoded and saved together for use in HTTP the authorization header.
* The project includes the Extra Credit functionality for the Exceeds Expectations grade
  * Includes pages for conditions related to page not found, page access if forbidden, and unhandled error. Pages have user-friendly error messages.
  * User login persists across browser tabs by use of a cookie.
  * If user was directed to the signin page by the create course or update course pages, the user is redirected back to the previous page when signing in is successful.

# Installation

## Installing the REST API

1. In a terminal window navigate to the project folder, then to the ```api``` folder.
2. Install npm modules with the command ```npm install```.
3. Create the database with the command ```npm run seed```.
The database is initially populated with two users and three courses. 

## Resetting the database
To reset database to its seed data
1. Stop the server with ctrl-C in the terminal window.
2. Delete the file fsjstd-restapi.db.
3. Recreate the database with the command ```npm run seed```.
4. Restart the application server with the command ```npm start```

## Installing the web application front end
1. In a terminal window navigate to the project folder, then to the ```client``` folder.
2. Install npm modules with the command ```npm install```.

# Starting the application

## Starting the API server
1. In a terminal windown and navigate to the project folder, then to the ```api``` folder.
2. Enter the command ```npm start```.
If the application starts successfully the following messages appear in the console
```
Express server is listening on port 5000
Executing (default): SELECT 1+1 AS result
Connected to database
```

## Starting the web app server
1. In a terminal windown and navigate to the project folder, then to the ```client``` folder.
2. Enter the command ```npm start```.
If the application starts successfully a browser window/tab opens in courses page.

# Pages
The application base URL is http://localhost:3000

Page headers have a navigation bar with either Sign Up and Sign In links (if the is no active user) or the current login name and a Sign Out link. The Courses text on the left side is a link to the home page.

## Home page
Lists all courses by redirecting to /courses

## User Sign Up
/signup

* The user is redirected to this page by the Sign Up link in the page header.
* Displays a form to enter user data. A Sign Up button submits the data.
* Cancel button redirects to courses page.
* After the Sign Up button is clicked:
  * If a new user is created the app redirects to the home page and the page header is updated with the user name.
  * If a new user is not created the validation errors are listed.

## User Sign In
/signin

* The user is redirected to this page by the Sign In link in the page header.
* Displays a form to enter email address and password. A Sign In button submits the form.
* Cancel button redirects to courses page.
* After the Sign In button is clicked:
  * If authentication is successful the page header is updated with the user name. If the sign-in was initiated from the header Sign In link the app redirects to the home page. If initiated by the Create Course or Update Course page, which requires authentication, the app redirects back to that page.
  * If authentication fails an error message is displayed.

## User Sign Out
/signout

* The user is redirected to this page by the Sign Out link in the page header.
* The app clears the current login, redirects to the home page, and updates page header.

## Courses
/courses

* Lists all courses as a set of tiles, plus a New Course tile.
* Clicking a tile opens the corresponding the Course Detail page. 
* Clicking the New Course tile opens the Create Course page.

## CourseDetail
/courses/_id_

* Displays the title, owner, description, time and materials for the course specified by id in the URL.
* The course description and materials fields are formated with the markdown format. For example, lines beginning with a \* are displayed as an unordered list, and two new-line characters starts a new paragraph. 
* Buttons to edit and delete the course are displayed if the current login created the course.
* The Return to List button redirects to the courses pages.
* Delete button calls the function to delete the course. If successful the app redirects to courses list page, otherwise to an error page.
* If the course id in the URL is not a valid course id the app redirects to the Not Found page.

## CreateCourse
/courses/create

* If there is no current login the app redirects to sign-in page which returns to create course when login is successful.
* Displays a form to enter course data. The Create Course button submits the course data.
* If the course is created the app redirects to the course list.
* If the course is not created due to validation errors the errors are displayed.
* Uses the current login for name and id as the course owner.
* The Cancel button returns to courses page.

## UpdateCourse
/courses/_id_/update

* The user is directed to the page from the course detail page by the Update Course button.
* Displays in a form for editig the course title, description, time and materials for the course specified by id in the URL. The Update Course button submits the update.
* If the update is successful the app redirects to the course detail page.
* If the course is not updated due to validation errors the errors are displayed.
* The Cancel button returns to course detail page.
* If a user enters the URL in the browser:
  * and if there is no current login the app redirects to sign-in page which returns to update course when login is successful,
  * or if the course owner is not the current login the app redirects to the Forbidden page,
  * or if the course id in the URL is not a valid course id the app redirects to the Not Found page.


## Delete Course
There is no route or page for deleting a course. The deletion functionality is called from the Course Detail page.

# Application Front-End Directory Structure
/client directory

## Primary Packages
* js-cookie
* react
* react-dom
* react-markdown
* react-router-dom

## Files and Directories

**Primary Files and Directories**
* \public - static files, such as favicon
* \src - primary folder for web application front-end.
* \page_design_docs - guidelines for page layout files from initial project download
* README.md - file autogenerated by npm containing npm commands. _Not the overall project readme_

### src sub-directory
* App.js - top-level of application logic, containing routes
* config.js - base URL for REST APIs
* Context.js - Higher-order component for sharing methods and user authentication.
* global.css - css for application
* index.js - root-level of application


* __Primary page rendering files__
  * CourseDetail
  * CreateCourse
  * Header
  * UpdateCourse
  * UserSignIn
  * UserSignUp
* __Supporting logic__
  * PrivateRoute
  * UserSignOut
* __Error message pages__
  * Forbidden
  * NotFound
  * UnhandledError


## Comments on code organization

* Context.js contains the functions which call the REST APIs and return the HTTP response.
* The Courses, CourseDetail, CreateCourse, UpdateCourse components call the relevant function in Context that get, create, update or delete a course(s). They check the API response and render the data returned, or based on the status code will display validation errors or redirect to the Not Found, Forbidden or Error (unhandled status) pages.
* The UserSignIn, UserSignUp components call the relavent function in Context to authenticate a signin or create a user. Based on the status code the app redirects if login or sign up was successful, or displays validation error message(s).
* The REST API performs the primary data validation checks for creating a user or course, or updating a course. Errors messages regarding specific fields are included in the HTTP response along with a 4xx code.


# REST API Service

**User Authentication**

Some routes require user authenication which expect the request has an Authorization header of type Basic Auth with the user email and plaintext password. (Unencrypted passwords for the seed users can be found in /seed/data.json.) Authenication failures return status 401 with a body containing the message "Access Denied" and a warning to the console (ex: "basic auth expected", "user not found").

## Routes

**GET /** (root)

Welcome message
* User authentication is not required.
* Returns status 200.
* Response body returns a welcome message named "message".

**GET /api/users**

Get the user with the credentials in the Authorization header
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

# Directory Structure
\api directory

## Primary packages

* react: front-end web page handler
* sqlite: database
* sequelize: database ORM
* express: backend route handler

## Files and Directories

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
