import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, COURSES_PER_PAGE } from '../constants';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner/Spinner';

class Courses extends React.Component {
  state = {
    page: 1
  };
  getQueryVariables = () => {
    const { page } = this.state;
    const first = COURSES_PER_PAGE;
    const skip = (page - 1) * COURSES_PER_PAGE;
    return {
      first,
      skip
    };
  };
  prevPage = () => {
    const { page } = this.state;
    if (page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  };
  nextPage = data => {
    const { page } = this.state;
    if (page <= data.courseFeed.count / COURSES_PER_PAGE) {
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  };
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div>
        <Query query={COURSE_FEED_QUERY} variables={this.getQueryVariables()}>
          {({ data, error, loading }) => {
            if (loading) return <Spinner />;
            if (error) return <ErrorMessage error={error} />;
            return (
              <React.Fragment>
                {data.courseFeed.courses.map(
                  ({ id, description, name, isPublished }) => {
                    return (
                      <div key={id} className="card container">
                        <div className="card-body">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text"> {description} </p>
                          {authToken ? (
                            <React.Fragment>
                              <Link
                                to={`course/${id}/edit`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>
                              <Mutation
                                mutation={DELETE_COURSE_MUTATION}
                                variables={{ id }}
                                update={(cache, { data: { deleteCourse } }) => {
                                  const { courseFeed } = cache.readQuery({
                                    query: COURSE_FEED_QUERY
                                  });
                                  cache.writeQuery({
                                    query: COURSE_FEED_QUERY,
                                    data: {
                                      courseFeed: courseFeed.filter(
                                        course => course.id !== deleteCourse.id
                                      )
                                    }
                                  });
                                }}
                              >
                                {(deleteCourse, { data, error, loading }) => {
                                  return (
                                    <button
                                      style={{ marginLeft: '10px' }}
                                      className="btn btn-danger"
                                      onClick={async () => {
                                        await deleteCourse();
                                      }}
                                    >
                                      Delete
                                    </button>
                                  );
                                }}
                              </Mutation>
                            </React.Fragment>
                          ) : null}
                        </div>
                      </div>
                    );
                  }
                )}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <div
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={this.prevPage}
                      >
                        Previous
                      </div>
                    </li>

                    <li className="page-item">
                      <div
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={this.nextPage.bind(this, data)}
                      >
                        Next
                      </div>
                    </li>
                  </ul>
                </nav>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export const DELETE_COURSE_MUTATION = gql`
  mutation DeletCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      name
    }
  }
`;
export const COURSE_FEED_QUERY = gql`
  query CourseFeed($first: Int, $skip: Int) {
    courseFeed(first: $first, skip: $skip) {
      count
      courses {
        id
        description
        name
        isPublished
      }
    }
  }
`;
export default Courses;
