/* eslint-disable @typescript-eslint/no-empty-interface */
import { LatLngLiteral } from 'leaflet';

import { MapLocation } from 'services/Geocoding/types';

export enum Transport {
  CAR = 'car',
  BIKE = 'bike',
  FOOT = 'foot',
}

export interface NavigateOptions {
  transport: Transport;
  waypoints?: LatLngLiteral;
}

export interface RoutePath {}

export interface Navigating {
  navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath>;
}

export interface GraphhopperRouteResponse {}
