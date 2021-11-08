import React, { useState } from 'react';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { SelectWayOfTransportProps } from './types';

const SelectWayOfTransport: React.FC<SelectWayOfTransportProps> = ({ value, onChange }) => {
  const [selectedTransport, setSelectedTransport] = useState<string | undefined>(value);

  const styles = {
    selected: {
      backgroundColor: '#1976d2',
      color: 'white',
      ':hover': { backgroundColor: '#1976d2b1' },
    },
  };

  const handleSelect = (v: string): void => {
    setSelectedTransport(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <>
      <Typography marginTop={2}>Choose way of transport</Typography>
      <Stack direction="row" margin={1} spacing={3}>
        <IconButton onClick={() => handleSelect('car')} sx={selectedTransport === 'car' ? styles.selected : {}}>
          <DirectionsCarIcon />
        </IconButton>
        <IconButton onClick={() => handleSelect('bike')} sx={selectedTransport === 'bike' ? styles.selected : {}}>
          <DirectionsBikeIcon />
        </IconButton>
        <IconButton onClick={() => handleSelect('foot')} sx={selectedTransport === 'foot' ? styles.selected : {}}>
          <DirectionsWalkIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default SelectWayOfTransport;
