import { LatLng } from 'leaflet';

import type { MapLocation } from 'services/Geocoding/types';
import { RoutePath, Transport } from 'services/Routing/types';

export interface IRoutingContext {
  setStart(point?: LatLng): void;
  setDestination(point?: LatLng): void;
  setEngine(engine: string): void;
  setTransport(transport: Transport): void;
  clear(): void;
  startPoint?: MapLocation;
  destinationPoint?: MapLocation;
  engine: string;
  error?: unknown;
  route?: RoutePath;
  transport: Transport;
}
