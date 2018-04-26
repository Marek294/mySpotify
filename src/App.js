import React, { Component } from 'react';
import {
  Switch,
  Redirect
} from 'react-router-dom';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import HomePage from './components/HomePage/HomePage';
import Player from './containers/Player/Player';
import Callback from './containers/Callback/Callback';

import './colors.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <GuestRoute exact path="/callback" component={Callback}/>
          <GuestRoute exact path="/" component={HomePage} />
          <UserRoute path="/" component={Player} />
          <Redirect to='/' />
      </Switch>
    );
  }
}

export default App;
