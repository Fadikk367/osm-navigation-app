import React from 'react';
import { Link } from 'react-router-dom';

import AltRouteIcon from '@mui/icons-material/AltRoute';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navigation: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
          <AltRouteIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OSM Navigation App
        </Typography>
        <Tabs textColor="secondary" indicatorColor="secondary">
          <Tab sx={{ color: 'white' }} value="/1" label="Home" component={Link} to="/" />
          <Tab sx={{ color: 'white' }} value="/2" label="Custom Engine" component={Link} to="/custom-routing-engine" />
          <Tab sx={{ color: 'white' }} value="/3" label="Animation" component={Link} to="/routing-animation" />
          <Tab sx={{ color: 'white' }} value="/4" label="About" component={Link} to="/about" />
        </Tabs>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navigation;
