import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Table from './components/table';
import Archive from './components/archive';
import Dtr from './components/dtrTemplates';
import { LogProvider } from './lib/contexts/LogContext';
import './App.css';

function App() {
  return (
    <Router>
      <LogProvider>
        <Header />
        <Layout>
          <Switch>
            <Route path="/" component={Table} exact />
            <Route
              path="/dtr/:year/:month/:cutoff"
              component={() => <Dtr template="lserv" />}
            />
            <Route path="/:year/:month" component={Table} exact />
          </Switch>
        </Layout>
        <hr />
        <Archive />
      </LogProvider>
    </Router>
  );
}

export default App;

const Layout = ({ children }) => <main>{children}</main>;
