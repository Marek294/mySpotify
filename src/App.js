import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import HomePage from './containers/HomePage/HomePage';
import Browse from './containers/Browse/Browse';
import Callback from './containers/Callback/Callback';
import NoMatch from './components/NoMatch/NoMatch';

import './colors.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <GuestRoute exact path="/" component={HomePage}/>
          <UserRoute exact path="/browse" component={Browse} />
          <GuestRoute exact path="/callback" component={Callback}/>
          <Route component={NoMatch}/>
      </Switch>
    );
  }
}

export default App;
