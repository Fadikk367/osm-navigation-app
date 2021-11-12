/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import type { LatLng } from 'leaflet';

import { geocodingService } from 'services';
import type { MapLocation } from 'services/Geocoding/types';
import * as routing from 'services/Routing';
import { RoutePath, Transport } from 'services/Routing/types';

import type { IRoutingContext } from './types';

export const RoutingContext = React.createContext<IRoutingContext | undefined>(undefined);

const RoutingProvider: React.FC = ({ children }) => {
  const [startPoint, setStartPoint] = useState<MapLocation>();
  const [destinationPoint, setDestinationPoint] = useState<MapLocation>();
  const [engine, setEngine] = useState<string>('OSMR');
  const [route, setRoute] = useState<RoutePath>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function recalculateRoute(): Promise<void> {
      if (startPoint && destinationPoint) {
        const routingService = routing.getRoutingByName(engine);
        const result = await routingService.navigate(startPoint, destinationPoint, { transport: Transport.CAR });
        result.geometry.coordinates = result.geometry.coordinates.map(([lat, lng]) => [lng, lat]);

        setRoute(result);
      }
    }
    recalculateRoute();
  }, [startPoint, destinationPoint, engine]);

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

  const clear = (): void => {
    setStartPoint(undefined);
    setDestinationPoint(undefined);
    setRoute(undefined);
  };

  return (
    <RoutingContext.Provider
      value={{ startPoint, destinationPoint, engine, error, route, setStart, setDestination, setEngine, clear }}
    >
      {children}
    </RoutingContext.Provider>
  );
};

export default RoutingProvider;
