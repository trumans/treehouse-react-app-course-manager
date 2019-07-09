import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Consumer } from './Context';
import './global.css';

class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: '',
  }

  // Send data to the Post /courses
  //   If a new course is created redirect to course detail
  //   otherwise display error messages
  submitForm = (event) => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    event.preventDefault();
    const course = { title, description, estimatedTime, materialsNeeded }
    context.actions.createCourse(course)
      .then((response) => {
        if (response.status === 201) {
          //context.actions.createCourse(course);
          this.props.history.push('/courses/???');
        } else if (response.status === 400 ) {
          response.json().then ((errors) => {
            this.setState(errors);
          });
        } else {
          this.props.history.push('/error');
        }
      });
  }

  // Redirect to home page
  cancelForm = (event) => {
    event.preventDefault();
    this.props.history.push('/')
  }

  changeTextInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }


  render() {

    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

    const form =
      <React.Fragment>
        <form onSubmit={this.submitForm}>

          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  value={title}
                  placeholder="Course title..."
                  onChange={this.changeTextInput}
                />
                <p>By TBD</p>
              </div>
            </div>

            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Course description..."
                  onChange={this.changeTextInput} >
                </textarea>
              </div>
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">

                <li className="course--stats--list-item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      placeholder="Hours"
                      onChange={this.changeTextInput}
                    />
                  </div>
                </li>

                <li className="course--stats--list-item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded}
                      placeholder="List materials..."
                      onChange={this.changeTextInput} >
                    </textarea>
                  </div>
                </li>

              </ul>
            </div>
          </div>

          <div className="grid-100 pad-bottom">
            <button
              className="button"
              type="submit"
            >Create Course</button>
            <button
              className="button button-secondary"
              onClick={this.cancelForm}
            >Cancel</button>
          </div>
        </form>
      </React.Fragment>

    return (
      <Consumer>
        { (context) => {
          return (
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
                {context.actions.formatErrors(errors)}
                {form}
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withRouter(CreateCourse);
