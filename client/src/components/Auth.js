import React, { Component } from 'react';
import './Auth.css';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

class Auth extends Component {
  state = {
    email: '',
    password: ''
  };
  onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onSubmitHandler = async (login, e) => {
    e.preventDefault();
    await login();
    this.props.history.push('/');
  };
  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }}>
        {(login, { data, error, loading }) => {
          if (error) return <div>Error</div>;
          if (loading) return <div>....Loading</div>;
          return (
            <div className="auth-form">
              <form
                className="form-signin"
                onSubmit={this.onSubmitHandler.bind(this, login)}
              >
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={this.onChangeHandler}
                  required
                  autoFocus
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChangeHandler}
                  required
                />
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
export default Auth;
