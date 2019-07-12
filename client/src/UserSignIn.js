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

  // Send entered credetials to the API
  //   If authentication succeeds redirect to home page
  //   otherwise clear page and display error message
  submitForm = (event) => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    event.preventDefault();
    context.actions.signIn({ name: emailAddress, password: password })
      .then((response) => {
        if (response.status === 200) {
          const a = context.actions.getAuthUser();
          console.log("in sign in submit form. auth user cookie", a);
          this.setState({ authd: 'yes' })
          const from = this.props.location.from;
          if (from) {
            this.props.history.push(from.pathname);
          } else {
            this.props.history.push('/');
          }
        } else if (response.status === 401 ) {
          this.setState({
            authd: '',
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
        <React.Fragment></React.Fragment>

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
              <div className="grid-33 centered signin">
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
              </div>
            </div>
          )
        }}
      </Consumer>
  	)
  }
}

export default withRouter(UserSignIn);