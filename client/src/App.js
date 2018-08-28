import React, { Component } from 'react';
import './App.css';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';

class App extends Component {
  render() {
    return (
      <div>
        <CreateCourse />
        <Courses />
      </div>
    );
  }
}

export default App;
