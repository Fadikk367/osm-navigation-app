import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SelectWayOfTransport from 'components/SelectWayOfTransport';
import { useRouting } from 'hooks';
import { formatMapLocation } from 'utils/Map';

import { RouteOptionsFormProps } from './types';

const RouteOptionsForm: React.FC<RouteOptionsFormProps> = ({ isOpen = true }) => {
  const { startPoint, destinationPoint, setEngine, engine, setTransport, transport } = useRouting();

  return (
    <div style={{ display: isOpen ? 'block' : 'none', transition: 'all 0.3s ease-in-out' }}>
      <Stack sx={{ width: '400px', backgroundColor: 'white' }} padding={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Configure your route</Typography>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack margin={1} marginBottom={3} spacing={2}>
          <TextField
            variant="standard"
            placeholder="Choose start point"
            value={startPoint && formatMapLocation(startPoint)}
          />
          <TextField
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
        </Select>
      </Stack>
    </div>
  );
};

export default RouteOptionsForm;
