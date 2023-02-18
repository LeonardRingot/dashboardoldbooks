import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Book from '../pages/book';
import Spot from '../pages/spot';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/spots" component={Spot} />
        <Route path="/books" component={Book} />
      </Switch>
    </div>
  );
}

export default Main;