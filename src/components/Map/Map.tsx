import React from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import type { MapEventsProps, MapProps } from './types';

const MapEvents: React.FC<MapEventsProps> = ({ onClick }) => {
  useMapEvents({ click: onClick });

  return null;
};

const Map: React.FC<MapProps> = ({ children, markers = [], ...events }) => {
  const renderedMarkers = markers.map((markerProps) => <Marker {...markerProps} />);

  return (
    <MapContainer style={{ flex: 1 }} center={[50.0612, 19.938]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents {...events} />
      {renderedMarkers}
      {children}
    </MapContainer>
  );
};

export default Map;
