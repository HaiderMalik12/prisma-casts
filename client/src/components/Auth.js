import React, { Component } from 'react';
import './Auth.css';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    loginStatus: false //check the route of the app it should be login or signup
  };
  componentDidMount() {
    console.log(this.props);
  }
  static getDerivedStateFromProps(props) {
    const { path } = props.match;
    if (path === '/login') {
      return { loginStatus: true };
    } else {
      return { loginStatus: false };
    }
  }
  onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onSubmitHandler = async (authMutate, e) => {
    e.preventDefault();
    const authResults = await authMutate();
    if (this.state.loginStatus) {
      localStorage.setItem(AUTH_TOKEN, authResults.data.login.token);
    } else {
      localStorage.setItem(AUTH_TOKEN, authResults.data.signup.token);
    }
    this.props.history.push('/');
  };
  render() {
    const { email, password } = this.state;
    const { loginStatus } = this.state;
    return (
      <Mutation
        mutation={loginStatus ? LOGIN_MUTATION : SIGNUP_MUTATION}
        variables={{ email, password }}
      >
        {(authMutate, { data, error, loading }) => {
          if (error) return <div>Error</div>;
          if (loading) return <div>....Loading</div>;
          return (
            <div className="auth-form">
              <form
                className="form-signin"
                onSubmit={this.onSubmitHandler.bind(this, authMutate)}
              >
                <h1 className="h3 mb-3 font-weight-normal">
                  Please {loginStatus ? 'sign in' : 'sign up'}
                </h1>
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
                  {loginStatus ? 'Login' : 'Signup'}
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
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
