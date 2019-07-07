import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './global.css'

class UserSignIn extends Component {

  // TO-DO move state to context
  state = { test: "blah" };

  async authenticate(user) {
    const url = "http://localhost:5000/api/users"
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },    
    };

    const encodedCredentials = btoa(`${user.name}:${user.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    const response = await fetch(url, options);
    if (response.status === 200) {
    	const authenticatedUser = await response.json(); 
    	console.log("authenticated user", authenticatedUser);
    	return authenticatedUser;
        // TO-DO: save uset record that's returned. update header
    } else if (response.status === 401) {
        console.log("user authentication failed for", user);
        return null
    } else {
        console.log("user authentication returned status", response.status);
        // TO-DO: redirect to error
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    // TO-DO: get user name and password from from form
    //   Temporarily hardcode user credentials
    // Console logs result:
    //   message 1. never displays
    //   message 2. displays the expected user
    //   message 3. displays the original state but is not updated.
    this.authenticate({ name: "joe@smith.com", password: "joepassword" })
      .then(user => 
      	{ this.setState(() => { return { authenticatedUser: user }}, 
      		() => {console.log("1.state is", this.state)});
      	  console.log("2.authenticated user is", user);
      });
    setTimeout(() => { console.log("3.state is", this.state)}, 2000);
  	this.props.history.push('/')
  }

  cancelForm = (event) => {
  	event.preventDefault();
  	this.props.history.push('/')
  }

  render() {

  	return (
  	  <div>
        <div class="bounds">
          <div class="grid-33 centered signin">
            <h1>Sign In</h1>      
  	        <form onSubmit={this.submitForm}>
  	          <div>
  	            <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" />
  	          </div>
  	          <div>
  	            <input id="password" name="password" type="password" placeholder="Password" />
  	          </div>
              <div class="grid-100 pad-bottom">
                <button class="button" type="submit">Sign In</button>
                <button class="button button-secondary" onClick={this.cancelForm}>Cancel</button>
              </div>
  	        </form>
  	      </div>
  	      <p> </p>
  	      <p>Don't have a user account? <Link to="/api/usersignup">Click here</Link> to sign up!</p>
  	    </div>
  	  </div>
  	)
  }
}

export default withRouter(UserSignIn);