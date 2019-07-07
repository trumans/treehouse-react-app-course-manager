import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import Header from './Header';
import Courses from './Courses';
import UserSignIn from './UserSignIn';
import NotFound from './NotFound';

class App extends Component {

  componentDidMount() {
    document.title = "Courses";
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to={`/api/courses`} /> } />
            <Route exact path="/api/courses" render={ () => <Courses /> } />
            <Route path="/api/usersignin" component={UserSignIn} />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
