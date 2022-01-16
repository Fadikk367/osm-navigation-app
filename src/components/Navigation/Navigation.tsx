import React from 'react';

import AltRouteIcon from '@mui/icons-material/AltRoute';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navigation: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
        <AltRouteIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        OSM Navigation App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navigation;
