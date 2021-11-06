import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const Home: React.FC = () => (
  <MapContainer style={{ flex: 1 }} center={[50.0612, 19.938]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
);

export default Home;
