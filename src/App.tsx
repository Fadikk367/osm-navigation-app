import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Box from '@mui/material/Box';

import { Navigation } from 'components';
import { About, CustomEngine, Home, NotFound, RoutingAnimation } from 'pages';

import GlobalStyles from './styles';

const App: React.FC = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Router>
      <GlobalStyles />
      <Navigation />
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/custom-routing-engine" component={CustomEngine} />
          <Route path="/routing-animation" component={RoutingAnimation} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Box>
    </Router>
  </Box>
);

export default App;
