/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { MarkerProps, Polyline } from 'react-leaflet';

import pinIcon from 'images/pin.png';
import { Icon, LeafletMouseEvent } from 'leaflet';
import Stack from '@mui/material/Stack';

import { Map, RouteOptionsForm, RouteInfo } from 'components';
import { useRouting } from 'hooks';

const Home: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  const routing = useRouting();
  const { startPoint, destinationPoint, route } = routing;

  useEffect(() => {
    const newMarkers: MarkerProps[] = [];

    if (startPoint) {
      newMarkers.push({
        position: startPoint.coordinates,
        icon: new Icon({
          iconUrl: pinIcon,
          iconSize: [42, 42],
        }),
      });
    }

    if (destinationPoint) {
      newMarkers.push({
        position: destinationPoint.coordinates,
        icon: new Icon({
          iconUrl: pinIcon,
          iconSize: [42, 42],
        }),
      });
    }

    setMarkers(newMarkers);
  }, [startPoint, destinationPoint]);

  const handleMapClick = (e: LeafletMouseEvent): void => {
    if (!startPoint && !destinationPoint) {
      routing.setStart(e.latlng);
    } else if (startPoint && !destinationPoint) {
      routing.setDestination(e.latlng);
    } else if (startPoint && destinationPoint) {
      routing.clear();
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: '460px',
          backgroundColor: 'white',
          overflowY: 'hidden',
          height: '91vh',
          position: 'relative',
        }}
        padding={2}
        spacing={4}
      >
        <RouteOptionsForm />
        <RouteInfo isLoading={!route} route={route} />
      </Stack>
      <Map onClick={handleMapClick} markers={markers}>
        <Polyline positions={route?.geometry.coordinates || []} color="#1976d2" weight={5} />
      </Map>
    </>
  );
};

export default Home;
