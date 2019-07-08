import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import './global.css'

class UserSignIn extends Component {

  submitForm = (event) => {
    const { context } = this.props;
    event.preventDefault();
    context.actions.signIn({ name: "joe@smith.com", password: "joepassword" })
      .then(() => { this.props.history.push('/') });
  }

  cancelForm = (event) => {
  	event.preventDefault();
  	this.props.history.push('/')
  }

  render() {

    const form =
      <React.Fragment>
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
      </React.Fragment>

  	return (
      <Consumer>
        { (context) => {
          return (
            <div class="bounds">
              <div class="grid-33 centered signin">
                <h1>Sign In</h1>
                {form}
  	          </div>
              <p> </p>
              <p>Don't have a user account? <Link to="/api/usersignup">Click here</Link> to sign up!</p>
            </div>
          )
        }}
      </Consumer>
  	)
  }
}

export default withRouter(UserSignIn);