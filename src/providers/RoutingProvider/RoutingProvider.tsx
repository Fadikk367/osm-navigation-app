import React, { useState } from 'react';

import { LatLng } from 'leaflet';

import { IRoutingContext, MapLocation } from './types';

export const RoutingContext = React.createContext<IRoutingContext | undefined>(undefined);

const geocodingBaseUrl = 'https://graphhopper.com/api/1/geocode';
const geocogindOptions = 'locale=en&debug=true&key=9b5dc8fa-e030-418a-8011-17472be5b1bb&reverse=true';

const RoutingProvider: React.FC = ({ children }) => {
  const [startPoint, setStartPoint] = useState<MapLocation>();
  const [destinationPoint, setDestinationPoint] = useState<MapLocation>();

  const setStart = async (point: LatLng): Promise<void> => {
    const res = await fetch(`${geocodingBaseUrl}?point=${point.lat},${point.lng}&${geocogindOptions}`);
    const data = await res.json();

    setStartPoint({
      coordinates: {
        lat: point.lat,
        lng: point.lng,
      },
      country: data.hits[0].country,
      city: data.hits[0].city,
      street: data.hits[0].street,
      postcode: data.hits[0].postcode,
      name: data.hits[0].name,
    });
  };

  const setDestination = async (point: LatLng): Promise<void> => {
    const res = await fetch(`${geocodingBaseUrl}?point=${point.lat},${point.lng}&${geocogindOptions}`);
    const data = await res.json();

    setDestinationPoint({
      coordinates: {
        lat: point.lat,
        lng: point.lng,
      },
      country: data.hits[0].country,
      city: data.hits[0].city,
      street: data.hits[0].street,
      postcode: data.hits[0].postcode,
      name: data.hits[0].name,
    });
  };

  return (
    <RoutingContext.Provider value={{ startPoint, destinationPoint, setStart, setDestination }}>
      {children}
    </RoutingContext.Provider>
  );
};

export default RoutingProvider;
