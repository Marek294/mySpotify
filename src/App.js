import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';
import NoMatch from './components/NoMatch/NoMatch';

import './colors.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route component={NoMatch}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
