import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Consumer } from './Context';
import Header from './Header';
import './global.css';

class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: '',
  }

  // Send data to the API
  //   If a new user is created sign in and redirect to home page
  //   otherwise display error messages
  submitForm = (event) => {
    event.preventDefault();
    const { history, context } = this.props;
    const { actions } = context;
    const { firstName, lastName, emailAddress, password, confirmPassword }
      = this.state;
    const user = { firstName, lastName, emailAddress, password, confirmPassword }

    actions.signUp(user)
      .then(async (response) => {
        if (response.status === 201) {
          await actions.signIn({name: emailAddress, password: password});
          context.authenticatedUser = await actions.getAuthCookie();
          history.push('/');
        } else if (response.status === 400 ) {
          response.json().then ((errors) => { this.setState(errors) });
        } else {
          history.push('/error');
        }
      });
  }

  changeTextInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }


  render() {

    const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;

    const form =
      <React.Fragment>
        <form onSubmit={this.submitForm}>
          <div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={this.changeTextInput}
            />
          </div>
          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={this.changeTextInput}
            />
          </div>
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
              autoComplete="off"
            />
          </div>
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={this.changeTextInput}
              autoComplete="off"
            />
          </div>
          <div className="grid-100 pad-bottom">

            <button
              className="button"
              type="submit"
            >Sign Up</button>

            <Link
              className="button button-secondary"
              to="/"
            >Cancel</Link>

          </div>
        </form>
      </React.Fragment>

    return (
      <Consumer>
        { ({ actions }) => {
          return (
            <div>
              <Header />
              <div className="bounds">
                <div className="grid-33 centered signup">
                  <h1>Sign Up</h1>
                  {actions.formatErrors(errors)}
                  {form}
                </div>
                <div className="grid-33 centered signup">
                  <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withRouter(UserSignUp);
