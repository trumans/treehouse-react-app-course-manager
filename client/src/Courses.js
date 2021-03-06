import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './Header';
import './global.css'

class Courses extends Component {

  state = { courses: [] }

  componentDidMount() {
    const { actions } = this.props.context;
    const { history } = this.props;
    actions.getCourses()
      .then((response) => {
        // response is Okay. parse into state.
        if (response.status === 200) {
          response.json().then(data => { this.setState( data ) })
        // any other status code
        } else {
          history.push('/error');
        }
    })
  }

  render() {
  	return (
      <div>
        <Header />
        <div className='bounds'>
          { this.state.courses.map((course) =>
            <CourseTile
              title={course.title}
              courseId={course.id}
              key={course.id}
            />
          )}
          <NewCourseTile />
        </div>
      </div>
  	)
  }
}

class CourseTile extends Component {
  
  render() {
  	let link = `courses/${this.props.courseId}`
  	return (
      <div className="grid-33">
        <a className="course--module course--link" href={link}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{this.props.title}</h3>
        </a>
      </div>
  	)
  }
}

class NewCourseTile extends Component {
  
  render() {
  	return (
      <div className="grid-33">
        <a className="course--module course--add--module" href="courses/create">
          <h3 className="course--add--title">{this.props.title}
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </a>
      </div>
  	)
  }
}

export default withRouter(Courses);