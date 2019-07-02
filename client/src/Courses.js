import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './global.css'

class Courses extends Component {

  state = {} 

  getCourses = () => {
    fetch("http://localhost:5000/api/courses", { method: 'GET' })
        .then(response => response.json())
        .then(data => this.setState( { courses: data.courses } ))
  }

  componentDidMount() {
  	this.getCourses(); 	
  }

  render() {
  	console.log("in Courses. state is ", this.state);
  	if (this.state.courses !== undefined) {
  	  return (
  	    <div class='bounds'>
          { this.state.courses.map((course) => <CourseTile title={course.title} courseId={course.id} /> ) }
  	    </div>
  	    )
  	} else {
  		return null
  	}
  }
}

class CourseTile extends Component {
  
  render() {
  	console.log("in course tile", this.props);
  	let link = `courses/${this.props.courseId}`
  	return (
      <div class="grid-33">
        <a class="course--module course--link" href={link}>
          <h4 class="course--label">Course</h4>
          <h3 class="course--title">{this.props.title}</h3>
        </a>
      </div>
  	)
  }
}

export default withRouter(Courses);