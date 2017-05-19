import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing';
import ProfileForm from './components/ProfileForm';
import Grid from './components/Grid';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

const Root = function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/form" component={ProfileForm} />
        <Route exact path="/grid" component={Grid} />
        <Route path="/grid/:uuid" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
