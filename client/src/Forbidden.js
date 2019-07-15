import React from 'react';
import Header from './Header';
import './global.css'

const Forbidden = () => {
  return (
    <div>
      <Header />
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </div>
  );
}

export default Forbidden;