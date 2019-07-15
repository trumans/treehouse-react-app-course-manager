import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import PrivateRoute   from './PrivateRoute';
import Courses        from './Courses';
import CourseDetail   from './CourseDetail';
import CreateCourse   from './CreateCourse';
import UpdateCourse   from './UpdateCourse';
import UserSignIn     from './UserSignIn';
import UserSignUp     from './UserSignUp';
import UserSignOut    from './UserSignOut';
import Forbidden      from './Forbidden';
import NotFound       from './NotFound';
import UnhandledError from './UnhandledError';

import addContext from './Context';
const CoursesAndContext      = addContext(Courses);
const CourseDetailAndContext = addContext(CourseDetail);
const CreateCourseAndContext = addContext(CreateCourse);
const UpdateCourseAndContext = addContext(UpdateCourse);
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
          <Switch>
            <Route exact path="/" render={ () => <Redirect to={`/courses`} /> } />
            <Route exact path="/courses" component={CoursesAndContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseAndContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseAndContext} />
            <Route path="/courses/:id" component={CourseDetailAndContext} />
            <Route path="/signin" component={UserSignInAndContext} />
            <Route path="/signup" component={UserSignUpAndContext} />
            <Route path="/signout" component={UserSignOutAndContext} />
            <Route path="/forbidden" component={Forbidden} />
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
