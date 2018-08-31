import React from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            ELearning
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Courses
                </Link>
              </li>
              {authToken && (
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Add Course
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {authToken ? (
                <li className="nav-item" style={{ cursor: 'pointer' }}>
                  <div
                    className="nav-link"
                    onClick={() => {
                      localStorage.removeItem(AUTH_TOKEN);
                      this.props.history.push('/');
                    }}
                  >
                    Logout
                  </div>
                </li>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
