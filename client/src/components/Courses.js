import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
                <div key={id}>
                  <p>Name: {name} </p>
                  <p>Description: {description} </p>
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
