import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
class EditCourse extends Component {
  render() {
    return (
      <Query
        query={SINGLE_COURSE_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data: { course }, error, loading }) => {
          if (loading) return <div>...Loading</div>;
          if (error) return <div>Error</div>;
          return (
            <div>
              <h1>{course.name}</h1>
              <p>{course.description}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}
export const SINGLE_COURSE_QUERY = gql`
  query Course($id: ID!) {
    course(id: $id) {
      id
      name
      description
      isPublished
    }
  }
`;
export default EditCourse;
