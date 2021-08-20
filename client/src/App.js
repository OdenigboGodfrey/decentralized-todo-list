import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { HomeWrapper as Home } from './pages/home/Home';
import { ListWrapper as List } from './pages/list/List';
import NoMatch from './pages/no-match/NoMatch';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list">
          <List/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
