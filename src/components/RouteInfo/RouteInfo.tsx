/* eslint-disable no-console */
import React from 'react';

import { Divider, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import TimelineIcon from '@mui/icons-material/Timeline';

import { getArrowByManeuver } from 'utils/Map';

import { RouteInfoProps } from './types';

const RouteInfo: React.FC<RouteInfoProps> = ({ isLoading, route }) => {
  if (isLoading) {
    return (
      // <LinearProgress />
      null
    );
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Estimated travel duration: ${route?.duration ? route?.duration.toFixed(2) : '--/--'} min`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Distance: ${route?.distance.toFixed(3)} km`}
          />
        </ListItem>
      </List>
      <List sx={{ height: '320px', overflowY: 'scroll', position: 'relative' }}>
        {route?.steps.map((step, index) => {
          const Icon = getArrowByManeuver(step.maneuver);
          return (
            <>
              <ListItem>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={step.text}
                  secondary={`${Math.round(step.distance * 1000)} m (${(step.duration).toFixed(2)} min)`}
                />
              </ListItem>
              {index !== route.steps.length ? <Divider /> : null}
            </>
          );
        })}
      </List>
    </Stack>
  );
};

export default RouteInfo;
