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
      	  Cookies.set('authenticatedUser', JSON.stringify(user.user), { expires: 7 });
    	})
    } else if (response.status === 401) {
        // Perhaps unnecesssary but remove any authentication cookies 
        this.signOut();
        return null
    } else {
        console.warn("user authentication returned status", response.status);
        // TO-DO: redirect to error
    }
  }

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
