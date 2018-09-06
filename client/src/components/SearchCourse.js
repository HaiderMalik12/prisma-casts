import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import Spinner from './Spinner/Spinner';

class SearchCourse extends Component {
  state = {
    filter: '',
    courses: [],
    loading: false
  };
  executeSearch = async e => {
    e.preventDefault();
    const { client } = this.props;
    const { filter } = this.state;
    this.setState({ loading: true });
    const { data } = await client.query({
      query: SEARCH_QUERY,
      variables: {
        filter
      }
    });
    this.setState({ courses: data.courseFeed.courses, loading: false });
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
        {this.state.loading && <Spinner />}
        {this.state.courses.map(({id, name, description }) => {
          return (
            <div className="card container" key={id}>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text"> {description} </p>
              </div>
            </div>
          );
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
