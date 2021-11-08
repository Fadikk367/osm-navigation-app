import { LatLng } from 'leaflet';
import type { MapLocation } from 'services/Geocoding/types';

export interface IRoutingContext {
  setStart(point: LatLng): void;
  setDestination(point: LatLng): void;
  startPoint?: MapLocation;
  destinationPoint?: MapLocation;
  error?: unknown;
}
