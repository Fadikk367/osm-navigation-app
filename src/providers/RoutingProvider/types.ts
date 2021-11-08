import { LatLng } from 'leaflet';

export interface MapLocation {
  coordinates: {
    lat: number;
    lng: number;
  };
  street: string;
  country: string;
  postcode: string;
  city: string;
  name: string;
}

export interface IRoutingContext {
  setStart(point: LatLng): void;
  setDestination(point: LatLng): void;
  startPoint?: MapLocation;
  destinationPoint?: MapLocation;
}
