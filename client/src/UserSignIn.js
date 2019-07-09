import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import './global.css'

class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    error: '',
  }

  // Sent entered credetials the the API
  //   If authentication succeeds redirect to home page
  //   otherwise clear page and display error message
  submitForm = (event) => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    event.preventDefault();
    context.actions.signIn({ name: emailAddress, password: password })
      .then((resp) => {
        if (resp === 200) {
          this.props.history.push('/');
        } else if (resp === 401 ) {
          this.setState({
            emailAddress: '',
            password: '',
            error: 'Authentication Failed',
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

    const { emailAddress, password, error } = this.state;

    const errorMessage =
      error ?
        <React.Fragment>
          <ul className="validation-errors">
            <li>{error}</li>
          </ul>
        </React.Fragment>
      :
        null

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
          <div className="grid-100 pad-bottom">
            <button
              className="button"
              type="submit"
            >Sign In</button>
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
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                {errorMessage}
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