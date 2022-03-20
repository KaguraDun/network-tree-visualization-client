import './App.scss';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home/Home';
import PageNotFound from '@/pages/PageNotFound/PageNotFound';

const App = () => (
  <>
    <div className="container">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </>
);

export default App;
