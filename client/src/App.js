import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import Header from './Header';
import CoursesList from './CoursesList';
import NotFound from './NotFound';

class App extends Component {

  state = {}

  getCourses = () => {
    fetch("http://localhost:5000/api/courses", { method: 'GET' })
        .then(response => response.json())
        .then(data => this.setState({ courses: data.courses }))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to={`/api/courses`} /> } />
            <Route exact path="/api/courses" render={ () => <CoursesList state={this.state} getCourses={this.getCourses} /> } />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
