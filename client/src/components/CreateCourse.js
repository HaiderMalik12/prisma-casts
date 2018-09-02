import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { COURSE_FEED_QUERY } from './Courses';
import ErrorMessage from './ErrorMessage';

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
          //fetch the courseFeed from the cache
          const { courseFeed } = cache.readQuery({
            query: COURSE_FEED_QUERY
          });
          //update the courseFeed from the cache
          cache.writeQuery({
            query: COURSE_FEED_QUERY,
            data: {
              courseFeed: courseFeed.concat([createCourse])
            }
          });
        }}
      >
        {(createCourse, { data, error, loading }) => {
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
