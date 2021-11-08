import React, { useState } from 'react';

import type { LatLng } from 'leaflet';
import { geocodingService } from 'services';
import type { MapLocation } from 'services/Geocoding/types';

import type { IRoutingContext } from './types';

export const RoutingContext = React.createContext<IRoutingContext | undefined>(undefined);

const RoutingProvider: React.FC = ({ children }) => {
  const [startPoint, setStartPoint] = useState<MapLocation>();
  const [destinationPoint, setDestinationPoint] = useState<MapLocation>();
  const [error, setError] = useState<unknown>();

  const setStart = async (point: LatLng): Promise<void> => {
    try {
      const location = await geocodingService.reverse(point);
      setStartPoint(location);
    } catch (err) {
      setError(err);
    }
  };

  const setDestination = async (point: LatLng): Promise<void> => {
    try {
      const location = await geocodingService.reverse(point);
      setDestinationPoint(location);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <RoutingContext.Provider value={{ startPoint, destinationPoint, error, setStart, setDestination }}>
      {children}
    </RoutingContext.Provider>
  );
};

export default RoutingProvider;
