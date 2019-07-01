import React, { Component } from 'react';
import { withRouter } from 'react-router';

class CoursesList extends Component {

  render() {
  	this.props.getCourses();
  	const x = this.props.state.courses

  	return (
  	  <div>
  	    <p>{ JSON.stringify(x) }</p>
  	  </div>
  	  )
  }
}

export default withRouter(CoursesList);