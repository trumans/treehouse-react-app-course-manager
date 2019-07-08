import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import './global.css';

const Header = () => {
  return (
    <Consumer>
      { ({ actions }) => {

        const authUser = actions.getAuthUser();
        const nav =
          authUser ?
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
              <Link class="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          :
            <React.Fragment>
              <Link class="signup" to="/signup">Sign Up</Link>
              <Link class="signin" to="/signin">Sign In</Link>
            </React.Fragment>

        return (
          <div class="header">
            <div class="bounds">
              <h1 class="header--logo">Courses</h1>
              <nav>{nav}</nav>
            </div>
          </div>
      )}}
    </Consumer>
  );
}

export default Header;