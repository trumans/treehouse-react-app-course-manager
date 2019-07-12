import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Consumer } from './Context';
import config from './config';
import './global.css';

class CourseDetail extends Component {

  getCourse = () => {
    const url = config.apiBaseUrl + "/courses/" + this.props.match.params.id;
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          this.setState( { course: data.course } )})
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.getCourse();
  }

  render() {
    const { context } = this.props;
    if (this.state.course === undefined) {
      return null;
    }
    const { title, description, estimatedTime, materialsNeeded, userId }
      = this.state.course;
    const courseId = this.state.course.id;
    const instructor = {firstName: "The", lastName: "Instructor"};
    // TO-DO: get course's instructor name
    const user = context.actions.getAuthUser();

    const details = () => {
      return (
        <React.Fragment>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {instructor.firstName} {instructor.lastName}</p>
            </div>

            <div className="course--description">
              <p>{description}</p>
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">

                <li className="course--stats--list-item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>

                <li className="course--stats--list-item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{materialsNeeded}</li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <Consumer>
        { (context) => {
          const changeButtons =
            // if the auth'd user is the same as the course user/owner
            //   include the update and delete buttons
            (user && user.id === userId) ?
              <React.Fragment>
                <a className="button" href={`/courses/${courseId}/update`}>Update Course</a>
                <a className="button" href={`/courses/${courseId}/delete`}>Delete Course</a>
              </React.Fragment>
            :
              <React.Fragment></React.Fragment>

          return (
            <React.Fragment>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>{changeButtons}</span>
                  <a className="button button-secondary" href="/courses">Return to List</a>
                </div>
              </div>
            </div>

            <div className="bounds course--detail">
              <div>
                {details()}
              </div>
            </div>
            </React.Fragment>
          )

        }}
      </Consumer>
    )
  }
}

export default withRouter(CourseDetail);
