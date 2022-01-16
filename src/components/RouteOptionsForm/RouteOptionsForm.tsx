import React from 'react';

import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SelectWayOfTransport from 'components/SelectWayOfTransport';
import { useRouting } from 'hooks';
import { formatMapLocation } from 'utils/Map';

import { RouteOptionsFormProps } from './types';

const RouteOptionsForm: React.FC<RouteOptionsFormProps> = () => {
  const { startPoint, destinationPoint, setEngine, engine, setTransport, transport } = useRouting();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Configure your route</Typography>
      </Stack>
      <Stack margin={1} marginBottom={3} spacing={2}>
        <TextField
          label="From"
          variant="standard"
          placeholder="Choose start point"
          value={startPoint && formatMapLocation(startPoint)}
        />
        <TextField
          label="To"
          variant="standard"
          placeholder="Choose destination point"
          value={destinationPoint && formatMapLocation(destinationPoint)}
        />
      </Stack>
      <Divider flexItem />
      <SelectWayOfTransport value={transport} onChange={(value) => setTransport(value)} />
      <Divider flexItem />
      <Typography marginTop={2} marginBottom={1}>
        Choose routing engine
      </Typography>
      <Select placeholder="engine" value={engine} onChange={(e) => setEngine(e.target.value)}>
        <MenuItem value="Graphhopper">Graphhopper</MenuItem>
        <MenuItem value="OSMR">OSMR</MenuItem>
        <MenuItem value="Custom">Custom</MenuItem>
      </Select>
    </Stack>
  );
};

export default RouteOptionsForm;
