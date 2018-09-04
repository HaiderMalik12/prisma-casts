import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import Course from './Course';

class SearchCourse extends Component {
  state = {
    filter: '',
    courses: []
  };
  executeSearch = async e => {
    e.preventDefault();
    const { client } = this.props;
    const { filter } = this.state;
    const { data } = await client.query({
      query: SEARCH_QUERY,
      variables: {
        filter
      }
    });
    this.setState({ courses: data.courseFeed.courses });
  };
  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <form onSubmit={this.executeSearch}>
          <div className="form-row">
            <div className="col-8">
              <input
                name="filter"
                type="text"
                className="form-control"
                placeholder="Search Course"
                value={this.state.filter}
                onChange={e => this.setState({ filter: e.target.value })}
              />
            </div>
            <div className="col-4">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
        {this.state.courses.map(course => {
          return <Course course={course} key={course.id} />;
        })}
      </div>
    );
  }
}
SearchCourse.propTypes = {
  client: PropTypes.object.isRequired
};
export const SEARCH_QUERY = gql`
  query SearchCourse($filter: String!) {
    courseFeed(filter: $filter) {
      courses {
        id
        name
        description
      }
      count
    }
  }
`;
export default withApollo(SearchCourse);
