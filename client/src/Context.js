import React, { Component } from 'react';
import Cookies from 'js-cookie';
import config from './config';

const Context = React.createContext();

export class Provider extends Component {

  getAuthUser() {
    return (Cookies.getJSON('authenticatedUser') || null );  
  }

  state = {
  	authenticatedUser: this.getAuthUser(),
  }

  render() {

    const { authenticatedUser } = this.state;

    const value = {
    	authenticatedUser,
    	actions: {
        signUp: this.signUp,
    		signIn: this.signIn,
    		signOut: this.signOut,
    		getAuthUser: this.getAuthUser,
        formatErrors: this.formatErrors,
    	}
    };

    if (value.authenticatedUser) {
    	console.log("Existing authenticated user", value.authenticatedUser.emailAddress);
    }

    return (
      <Context.Provider value={value}>
        { this.props.children }
      </Context.Provider>
      )
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
     Authenticate the user credentials
       @param user - object containing name and password to pass to Get /api/users
       @returns response status code of 200 or 401

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
    	response.json().then((user) => {
          const cookieData = user.user;
          cookieData.authorization = encodedCredentials;
          Cookies.set('authenticatedUser', JSON.stringify(cookieData), { expires: 7 });
    	})
    } else if (response.status === 401) {
        // Perhaps unnecesssary but remove any authentication cookies
        this.signOut();
    } else {
        console.warn("user authentication returned status", response.status);
    }

    return response.status;
  }

  /*
      Remove the authentication cookie
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
