import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Consumer } from './Context';
import './global.css';

class CourseDetail extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    User: {}
  }

  // Send data to the Put /courses/:id
  //   If the course is deleted redirect to courses list
  //   otherwise redirect as per status code
  handleDeleteCourse = (courseId) => {
    const { context } = this.props;
    context.actions.deleteCourse(courseId)
      .then((response) => {
        // delete was successful. redirect to courses list
        if (response.status === 204) {
          this.props.history.push('/courses');
        // delete was not allowed. redirect to Forbidden page
        } else if (response.status === 403 ) {
          this.props.history.push('/forbidden');
        // course id was not found. redirect to Not Found page
        } else if (response.status === 404 ) {
          this.props.history.push('/notfound');
        // all other status codes
        } else {
          this.props.history.push('/error');
        }
      });
  }

  componentDidMount() {
    const { context } = this.props;
    context.actions.getCourse(this.props.match.params.id)
      .then((response) => {
        // a course was returned. parse into state.
        if (response.status === 200) {
          response.json().then(data => { this.setState( data.course ) })
        // no course was returned
        } else if (response.status === 404) {
          this.props.history.push('/notfound');
        // any other status code
        } else {
          this.props.history.push('/error');
        }
    })
  }

  render() {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const owner = this.state.User;
    const courseId = this.state.id;
    const authUser = context.actions.getAuthUser();

    const details = () => {
      return (
        <React.Fragment>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {owner.firstName} {owner.lastName}</p>
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
            // if the auth'd user is the same as the course owner
            //   include the update and delete buttons
            (authUser && authUser.id === owner.id) ?
              <React.Fragment>

                <a
                  className="button"
                  href={`/courses/${courseId}/update`}
                >Update Course</a>

                <button
                  className="button"
                  onClick={() => {this.handleDeleteCourse(courseId)}}
                >Delete Course</button>

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
