import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <div>
      <Query query={COURSE_FEED_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>...Loading</p>;
          if (error) return <p>Error</p>;
          return data.courseFeed.map(
            ({ id, description, name, isPublished }) => {
              return (
                <div key={id} className="card container">
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text"> {description} </p>
                    <Link to={`course/${id}/edit`} className="btn btn-primary">
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
                  </div>
                </div>
              );
            }
          );
        }}
      </Query>
    </div>
  );
};

export const DELETE_COURSE_MUTATION = gql`
  mutation DeletCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      name
    }
  }
`;
export const COURSE_FEED_QUERY = gql`
  {
    courseFeed {
      id
      description
      name
      isPublished
    }
  }
`;
export default Courses;
