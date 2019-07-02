import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './global.css'

class Courses extends Component {

  render() {
  	this.props.getCourses();
  	const courses = this.props.state.courses
  	console.log("in Courses", this.props)

  	return (
  	  <div class='bounds'>
 
        { courses.map((course) => <CourseTile title={course.title} courseId={course.id} /> ) }
  	  </div>
  	  )
//  	{ JSON.stringify(courses) }
  }
}

class CourseTile extends Component {
  
  render() {
  	return (
      <div class="grid-33">
        <a class="course--module course--link" href="this.props.id">
          <h4 class="course--label">Course</h4>
          <h3 class="course--title">this.props.title</h3>
        </a>
      </div>
  	)
  }
}

export default withRouter(Courses);