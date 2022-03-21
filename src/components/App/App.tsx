import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home/Home';
import PageNotFound from '@/pages/PageNotFound/PageNotFound';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const App = () => (
  <>
    <Header />
    <main className="container d-flex aligns-items-center justify-content-center">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={PageNotFound} />
      </Switch>
    </main>
    <Footer />
  </>
);

export default App;
