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
  	let tiles = null
  	//console.log("in Courses. state is ", this.state);
  	if (this.state.courses !== undefined) {
  	  tiles = this.state.courses.map((course) => <CourseTile title={course.title} courseId={course.id} /> )
    }

  	return (
      <div class='bounds'>
        { tiles }
        <NewCourseTile />
      </div>
  	)
  }
}

class CourseTile extends Component {
  
  render() {
  	//console.log("in course tile", this.props);
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

class NewCourseTile extends Component {
  
  render() {
  	return (
      <div class="grid-33">
        <a class="course--module course--add--module" href="courses/create">
          <h3 class="course--add--title">{this.props.title}
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" class="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            "New Course"
          </h3>
        </a>
      </div>
  	)
  }
}

export default withRouter(Courses);