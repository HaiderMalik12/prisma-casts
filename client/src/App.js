import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import EditCourse from './components/EditCourse';
import Auth from './components/Auth';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import { AUTH_TOKEN } from './constants';

class App extends Component {
  render() {
    const isAuth = localStorage.getItem(AUTH_TOKEN) ? true : false;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <UnauthRoute
            exact
            path="/login"
            component={Auth}
            redirectTo="/"
            authenticated={isAuth}
          />
          <UnauthRoute
            exact
            path="/signup"
            component={Auth}
            redirectTo="/"
            authenticated={isAuth}
          />
          <AuthRoute
            exact
            path="/create"
            component={CreateCourse}
            redirectTo="/login"
            authenticated={isAuth}
          />
          <AuthRoute
            exact
            path="/course/:id/edit"
            component={EditCourse}
            redirectTo="/login"
            authenticated={isAuth}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
