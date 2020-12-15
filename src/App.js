import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clock from './components/clock';
import Table from './components/table';
import Archive from './components/archive';

import Dtr from './components/dtrTemplates';

import { LogProvider } from './lib/contexts/LogContext';
import generateUid from './lib/utils/generateUid';

function App() {
  return (
    <Router>
      <LogProvider>
        <p>Your user id: {generateUid()}</p>
        <hr />
        <Clock />
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/" component={Table} exact />
          <Route
            path="/dtr/:year/:month/:cutoff"
            component={() => <Dtr template="lserv" />}
          />
          <Route path="/:year/:month" component={Table} exact />
        </Switch>
        <hr />
        <Archive />
      </LogProvider>
    </Router>
  );
}

export default App;
