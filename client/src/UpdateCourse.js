import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Consumer } from './Context';
import Header from './Header';
import './global.css';

class UpdateCourse extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    User: {}
  }

  // Send data to the Put /courses/:id
  //   If the course is updated redirect to course detail
  //   otherwise display error messages
  submitForm = (event) => {
    event.preventDefault();
    const { context } = this.props;
    context.actions.updateCourse(this.state)
      .then((response) => {
        if (response.status === 204) {
          this.props.history.push('/courses/' + this.props.match.params.id);
        } else if (response.status === 400 ) {
          response.json().then ((errors) => {
            this.setState(errors);
          });
        } else {
          this.props.history.push('/error');
        }
      });
  }

  changeTextInput = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    const { context } = this.props;
    const authUser = context.actions.getAuthUser()
    context.actions.getCourse(this.props.match.params.id)
      .then((response) => {
        // a course was returned. parse into state.
        if (response.status === 200) {
          response.json().then(data => {
            this.setState( data.course );
            // if course owner is not current user then redirect to forbidden
            if (this.state.userId !== authUser.id) {
              this.props.history.push('/forbidden');
            }
          });
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
    const { id, title, description, estimatedTime, materialsNeeded, errors } = this.state;
    const owner = this.state.User;

    const form = () => {
      return (
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
                  <p>By {owner.firstName} {owner.lastName}</p>
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
              >Update Course</button>
              <Link
                className="button button-secondary"
                to={`/courses/${id}`}
              >Cancel</Link>
            </div>
          </form>
        </React.Fragment>
      )
    }

    return (
      <Consumer>
        { (context) => {
          return (
            <div>
              <Header />
              <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                  {context.actions.formatErrors(errors)}
                  {form()}
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withRouter(UpdateCourse);
