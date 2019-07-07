import React from 'react';
import { Link } from 'react-router-dom';
import './global.css';

const Header = () => {
  return (
    <div class="header">
      <div class="bounds">
        <h1 class="header--logo">Courses</h1>
        <nav>
          <Link class="signup" to="/api/usersignup">Sign Up</Link>
          <Link class="signin" to="/api/usersignin">Sign In</Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;