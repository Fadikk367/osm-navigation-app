import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Navigation } from 'components';
import { About, CustomEngine, Home, NotFound, RoutingAnimation } from 'pages';

const App: React.FC = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/custom-routing-engine" component={CustomEngine} />
      <Route path="/routing-animation" component={RoutingAnimation} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
