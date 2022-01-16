import React, { useState } from 'react';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Transport } from 'services/Routing/types';

import type { SelectWayOfTransportProps } from './types';

const SelectWayOfTransport: React.FC<SelectWayOfTransportProps> = ({ value, onChange }) => {
  const [selectedTransport, setSelectedTransport] = useState<Transport>(value);

  const styles = {
    selected: {
      backgroundColor: '#1976d2',
      color: 'white',
      ':hover': { backgroundColor: '#1976d2b1' },
    },
  };

  const handleSelect = (v: Transport): void => {
    setSelectedTransport(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <>
      <Typography marginTop={2}>Choose way of transport</Typography>
      <Stack direction="row" margin={1} spacing={3} justifyContent="space-between">
        <IconButton
          onClick={() => handleSelect(Transport.CAR)}
          sx={selectedTransport === Transport.CAR ? styles.selected : {}}
        >
          <DirectionsCarIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSelect(Transport.BIKE)}
          sx={selectedTransport === Transport.BIKE ? styles.selected : {}}
        >
          <DirectionsBikeIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSelect(Transport.FOOT)}
          sx={selectedTransport === Transport.FOOT ? styles.selected : {}}
        >
          <DirectionsWalkIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default SelectWayOfTransport;
