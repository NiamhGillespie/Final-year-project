import './App.css';
import React, { Component, Fragment } from 'react';
import Home from "./components/home";
import BaseTemplate from './components/base_template';

class App extends Component {
  render() {
    return (
      <Fragment>
        <BaseTemplate />
        <Home />
      </Fragment>
    );
  }
}

export default App;
