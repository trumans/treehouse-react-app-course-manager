import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import Header from './Header';
import NotFound from './NotFound';

class App extends Component {

  state = {}

  call_get_root() {
    console.log("in call_get_root")
    fetch("http://localhost:5000", { method: 'GET' })
        .then(response => response.json())
        .then(data => this.setState({ message: data }))
  }

/*
  componentDidMount() {
    this.call_get_root()
  }
*/

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" render={ () => 
              <p>
                { "ta-da! " }
                { this.call_get_root() } { JSON.stringify(this.state.message) }
              </p>
             } />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
