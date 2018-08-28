import React, { Component } from 'react';

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
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h3>Create Course</h3>
          </div>
          <div className="card-body">
            <form>
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateCourse;
