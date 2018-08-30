import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import EditCourse from './components/EditCourse';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/create" component={CreateCourse} />
          <Route exact path="/course/:id/edit" component={EditCourse} />
        </Switch>
      </div>
    );
  }
}

export default App;
