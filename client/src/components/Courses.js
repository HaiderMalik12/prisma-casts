import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const renderCourses = ({ data, error, loading }) => {
  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error</p>;
  return data.courseFeed.map(({ id, description, name, isPublished }) => {
    return (
      <div key={id}>
        <p>Name: {name} </p>
        <p>Description: {description} </p>
        <hr />
      </div>
    );
  });
};
const Courses = () => {
  return (
    <div>
      <Query
        query={gql`
          {
            courseFeed {
              id
              description
              name
              isPublished
            }
          }
        `}
      >
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

export default Courses;
