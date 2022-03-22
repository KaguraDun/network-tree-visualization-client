import './App.scss';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Home from '@/pages/Home/Home';
import PageNotFound from '@/pages/PageNotFound/PageNotFound';

const App = () => (
  <>
    <Header />
    <main className="container d-flex justify-content-center">
      <div className="content_mt-large w-75">
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </main>
    <Footer />
  </>
);

export default App;
