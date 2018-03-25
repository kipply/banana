import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Answer from './components/Answer'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/answer' component={Answer}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
