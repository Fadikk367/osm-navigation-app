/* eslint-disable camelcase */
import { LatLngLiteral } from 'leaflet';

import { MapLocation } from 'services/Geocoding/types';

export enum Transport {
  CAR = 'car',
  BIKE = 'bike',
  FOOT = 'foot',
}

export enum GeometryType {
  LINE_STRING = 'LineString',
}

export enum Maneuver {
  TURN_RIGHT = 'TURN_RIGHT',
  TURN_LEFT = 'TURN_LEFT',
  TURN_SLIGHT_LEFT = 'TURN_SLIGHT_LEFT',
  TURN_SLIGHT_RIGHT = 'TURN_SLIGHT_RIGHT',
}

export interface NavigateOptions {
  transport: Transport;
  waypoints?: LatLngLiteral;
}

export interface RoutePath {
  distance: number;
  duration: number;
  geometry: {
    type: GeometryType;
    coordinates: [number, number][];
  };
  steps: {
    distance: number;
    duration: number;
    maneuver: Maneuver;
    point: [number, number];
    text: string;
  }[];
}

export interface Navigating {
  navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath>;
}

export interface GraphhopperRouteResponse {
  hints: unknown;
  info: { copyrights: string; took: number };
  paths: {
    distance: number;
    time: number;
    points: {
      type: GeometryType;
      coordinates: [number, number][];
    };
    instructions: {
      distance: number;
      time: number;
      interval: [number, number];
      sign: number;
      street_name: string;
      text: string;
    }[];
  }[];
}

export interface OSMRRouteResponse {
  code: string;
  waypoints: [];
  routes: {
    legs: {
      distance: number;
      duration: number;
      steps: {
        distance: number;
        duration: number;
        driving_side: 'right' | 'left';
        name: string;
        geometry: {
          type: GeometryType;
          coordinates: [number, number][];
        };
        maneuver: {
          location: [number, number];
          modifier: string;
          type: string;
        };
      }[];
    }[];
  }[];
}
