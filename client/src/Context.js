import React, { Component } from 'react';
import Cookies from 'js-cookie';
import config from './config';

const Context = React.createContext();

export class Provider extends Component {

  render() {
    const value = {
      authenticatedUser: Cookies.getJSON('authenticatedUser'),
    	actions: {
        getAuthCookie: this.getAuthCookie,
        getCourses: this.getCourses,
        getCourse: this.getCourse,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
    		signIn: this.signIn,
        signUp: this.signUp,
    		signOut: this.signOut,
        formatErrors: this.formatErrors,
    	}
    };

    return (
      <Context.Provider value={value}>
        { this.props.children }
      </Context.Provider>
      )
  }

  /*
     Get the authentication cookie
  */
  async getAuthCookie() {
    return (await Cookies.getJSON('authenticatedUser'));
  }

  /*
     Get all courses
  */
  async getCourses() {
    const url = config.apiBaseUrl + "/courses";
    const response = await fetch(url, { method: 'GET' });
    return response;
  }

  /*
     Get a course as specified by URL
  */
  async getCourse(id) {
    const url = config.apiBaseUrl + "/courses/" + id;
    const response = await fetch(url, { method: 'GET' })
    return response;
  }

  /*
     Create a new course
       @param course - object containing new course data pass to Post /api/course
       @returns response
  */
  async createCourse(course, user) {
    const url = config.apiBaseUrl + '/courses';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(course),
    };

    options.headers['Authorization'] = `Basic ${user.authorization}`;
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 400) {
        console.warn("course create returned status", response.status);
    }

    return response;
  }

  /*
     Update a course
       @param course - object containing course data pass to Put /api/course
       @returns response
  */
  async updateCourse(course, user) {
    const url = config.apiBaseUrl + '/courses/' + course.id;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(course),
    };

    options.headers['Authorization'] = `Basic ${user.authorization}`;
    const response = await fetch(url, options);
    if (response.status !== 204 && response.status !== 400) {
        console.warn("course create returned status", response.status);
    }

    return response;
  }

  /*
     Delete a course
       @param id - id of course to be deletedto pass to Delete /api/courses/:id
       @returns response
  */
  async deleteCourse(courseId, user) {
    const url = config.apiBaseUrl + '/courses/' + courseId;
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };

    options.headers['Authorization'] = `Basic ${user.authorization}`;
    const response = await fetch(url, options);
    if (![204, 403, 404].includes(response.status)) {
        console.warn("course delete returned status", response.status);
    }

    return response;
  }

  /*
     Authenticate the user credentials
       @param user - object containing name and password to pass to Get /api/users
       @returns http response

       packages 'user' parameter into HTTP Authorization header
       if authentication succeeds a browser cookie is created named
         authenticatedUser containing the elements id, firstName, lastName,
         emailAddress (from the returned user record), and authorization
         (the encoded user:password value used in the GET authorization header).
  */
  async signIn(user) {
    const url = config.apiBaseUrl + "/users";
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },    
    };

    const encodedCredentials = btoa(`${user.name}:${user.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    const response = await fetch(url, options);
    if (response.status === 200) {
      // set cookie data. caller function should set context auth user
      await response.json().then( async (user) => {
          const cookieData = user.user;
          cookieData.authorization = encodedCredentials;
          await Cookies.set(
            'authenticatedUser', JSON.stringify(cookieData), { expires: 7 });
      })
    } else if (response.status === 401) {
        // Perhaps unnecesssary but remove any authentication cookies
        this.signOut();
    } else {
        console.warn("user authentication returned status", response.status);
    }

    return response;
  }

  /*
     Create a new user
       @param user - object containing new user data pass to Post /api/users
       @returns response
  */
  async signUp(user) {
    const url = config.apiBaseUrl + '/users';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 400) {
        console.warn("user create returned status", response.status);
    }

    return response;
  }

  /*
      Remove the local authentication data
  */
  async signOut() {
    Cookies.remove('authenticatedUser');
  }

  formatErrors(errors) {
    return (
      errors ?
        <React.Fragment>
          <h2 className="validation--errors--label">Validation errors</h2>
          <ul className="validation-errors">
            { errors.map((error, index) => { return (<li key={index}>{error}</li>) } ) }
          </ul>
        </React.Fragment>
      :
        null
    )
  }

}

export const Consumer = Context.Consumer;

export default function addContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
