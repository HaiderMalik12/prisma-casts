import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { COURSE_FEED_QUERY } from './Courses';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner/Spinner';
import { COURSES_PER_PAGE } from '../constants';

class CreateCourse extends Component {
  state = {
    name: '',
    description: ''
  };
  onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    const { name, description } = this.state;
    return (
      <Mutation
        mutation={CREATE_COURSE_MUTATION}
        onCompleted={() => this.props.history.push('/')}
        update={(cache, { data: { createCourse } }) => {
          const variables = {
            first: COURSES_PER_PAGE,
            skip: 0,
            orderBy: 'createdAt_DESC'
          };
          const data = cache.readQuery({
            query: COURSE_FEED_QUERY,
            variables
          });
          data.courseFeed.courses.unshift(createCourse);
          cache.writeQuery({
            query: COURSE_FEED_QUERY,
            data,
            variables
          });
        }}
      >
        {(createCourse, { data, error, loading }) => {
          if (loading) return <Spinner />;
          if (error) return <ErrorMessage error={error} />;
          return (
            <div className="container">
              <div className="card">
                <div className="card-title">
                  <h3>Create Course</h3>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      await createCourse({
                        variables: {
                          name: this.state.name,
                          description: this.state.description
                        }
                      });
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        placeholder="Enter description"
                        rows="3"
                        value={description}
                        onChange={this.onChangeHandler}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      id
      description
      isPublished
      name
    }
  }
`;
export default CreateCourse;
