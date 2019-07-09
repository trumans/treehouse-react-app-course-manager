import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import Header from './Header';

import Courses        from './Courses';
import CreateCourse   from './CreateCourse';
import UserSignIn     from './UserSignIn';
import UserSignUp     from './UserSignUp';
import UserSignOut    from './UserSignOut';
import NotFound       from './NotFound';
import UnhandledError from './UnhandledError';

import addContext from './Context';
const CoursesAndContext      = addContext(Courses);
const CreateCourseAndContext = addContext(CreateCourse);
const UserSignInAndContext   = addContext(UserSignIn);
const UserSignUpAndContext   = addContext(UserSignUp);
const UserSignOutAndContext  = addContext(UserSignOut);

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
            <Route exact path="/" render={ () => <Redirect to={`/courses`} /> } />
            <Route exact path="/courses" component={CoursesAndContext} />
            <Route path="/courses/create" component={CreateCourseAndContext} />
            <Route path="/signin" component={UserSignInAndContext} />
            <Route path="/signup" component={UserSignUpAndContext} />
            <Route path="/signout" component={UserSignOutAndContext} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/error" component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
