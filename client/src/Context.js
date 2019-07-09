import React, { Component } from 'react';
import Cookies from 'js-cookie';

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
    		signIn: this.signIn,
    		signOut: this.signOut,
    		getAuthUser: this.getAuthUser,
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
     Authenticate the user credentials
       @param user - object containing name and password to be passed to API
       @returns response status code of 200 or 401

       packages 'user' parameter into HTTP Authorization header
       if authentication succeeds a browser cookie is created named
         authenticatedUser containing the elements id, firstName, lastName,
         emailAddress (from the returned user record), and authorization
         (the encoded user:password value used in the GET authorization header).
  */
  async signIn(user) {
    const url = "http://localhost:5000/api/users";
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
        // TO-DO: redirect to error
    }

    return response.status;
  }

  /*
      Remove the authentication cookie
  */
  async signOut() {
    Cookies.remove('authenticatedUser');
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
