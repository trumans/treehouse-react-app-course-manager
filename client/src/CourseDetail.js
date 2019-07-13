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
    materialsNeeded: ''
  }

  componentDidMount() {
    const { context } = this.props;
    context.actions.getCourse(this.props.match.params.id)
      .then((response) => {
        if (response.status === 200) {
          response.json().then(data => { this.setState( data.course ) })
        } else if (response.status === 404) {
          this.props.history.push('/notfound');
        } else {
          this.props.history.push('/error');
        }
    })
  }

  render() {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, userId } 
      = this.state;
    const courseId = this.state.id;
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
