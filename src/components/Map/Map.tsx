import React from 'react';
import { CircleMarker, MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from 'react-leaflet';

import { useRouting } from 'hooks';

import type { MapEventsProps, MapProps } from './types';

const MapEvents: React.FC<MapEventsProps> = ({ onClick }) => {
  useMapEvents({ click: onClick });

  return null;
};

const Map: React.FC<MapProps> = ({ children, markers = [], ...events }) => {
  const renderedMarkers = markers.map((markerProps) => <Marker {...markerProps} />);
  const routing = useRouting();

  const circleMarkers = routing.route?.steps.map((step) => (
    <CircleMarker
      center={[step.point[1], step.point[0]]}
      radius={7}
      pathOptions={{ color: 'red', weight: 4, fillColor: 'white', fillOpacity: 1 }}
    >
      <Tooltip>{step.text}</Tooltip>
    </CircleMarker>
  ));

  // eslint-disable-next-line no-console
  console.log({ circleMarkers });

  return (
    <MapContainer style={{ flex: 1 }} center={[50.0612, 19.938]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents {...events} />
      {renderedMarkers}
      {children}
      {circleMarkers}
    </MapContainer>
  );
};

export default Map;
