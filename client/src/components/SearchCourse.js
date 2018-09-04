import React, { Component } from 'react';

class SearchCourse extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <form>
          <div className="form-row">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search Course"
              />
            </div>
            <div className="col-4">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchCourse;
