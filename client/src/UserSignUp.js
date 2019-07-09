import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import './global.css'

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
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

    event.preventDefault();
    const user = { firstName, lastName, emailAddress, password, confirmPassword }
    context.actions.signUp(user)
      .then((response) => {
        if (response.status === 201) {
          context.actions.signIn({name: emailAddress, password: password}) 
          this.props.history.push('/');
        } else if (response.status === 400 ) {
          response.json().then ((errors) => {
            this.setState(errors);
          });
        } else {
          this.props.history.push('/error');
        }
      });
  }

  // Redirect to home page
  cancelForm = (event) => {
    event.preventDefault();
    this.props.history.push('/')
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
            />
          </div>
          <div className="grid-100 pad-bottom">
            <button
              className="button"
              type="submit"
            >Sign Up</button>
            <button
              className="button button-secondary"
              onClick={this.cancelForm}
            >Cancel</button>
          </div>
        </form>
      </React.Fragment>

    return (
      <Consumer>
        { (context) => {
          return (
            <div className="bounds">
              <div className="grid-33 centered signup">
                <h1>Sign Up</h1>
                {context.actions.formatErrors(errors)}
                {form}
              </div>
              <p> </p>
              <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withRouter(UserSignUp);
