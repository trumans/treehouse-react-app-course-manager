import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import './global.css'

class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
  }

  submitForm = (event) => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    event.preventDefault();
    context.actions.signIn({ name: emailAddress, password: password })
      .then(() => { this.props.history.push('/') });
  }

  cancelForm = (event) => {
  	event.preventDefault();
  	this.props.history.push('/')
  }

  changeTextInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => { return { [name]: value }});
  }


  render() {

    const { emailAddress, password } = this.state;

    const form =
      <React.Fragment>
        <form onSubmit={this.submitForm}>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              value={emailAddress}
              placeholder="Email Address"
              onChange={this.changeTextInput}
            />
  	      </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.changeTextInput}
            />
          </div>
          <div class="grid-100 pad-bottom">
            <button
              class="button"
              type="submit"
            >Sign In</button>
            <button
              class="button button-secondary"
              onClick={this.cancelForm}
            >Cancel</button>
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