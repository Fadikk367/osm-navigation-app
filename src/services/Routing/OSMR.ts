/* eslint-disable no-console */
import axios from 'axios';

import { MapLocation } from 'services/Geocoding/types';

import { GeometryType, Maneuver, NavigateOptions, Navigating, OSMRRouteResponse, RoutePath } from './types';

class OSMRRoutingService implements Navigating {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://routing.openstreetmap.de';
  }

  async navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath> {
    try {
      const params = OSMRRoutingService.getParams(start, destination, options);
      const encodedPoints =
        `${start.coordinates.lng},${start.coordinates.lat}` +
        ';' +
        `${destination.coordinates.lng},${destination.coordinates.lat}`;

      const url = `${this.baseUrl}/routed-${options.transport}/route/v1/driving/${encodedPoints}?${params}`;
      const res = await axios.get<OSMRRouteResponse>(url);

      return OSMRRoutingService.transformResponse(res.data);
    } catch (err) {
      console.log({ err });
      throw new Error('Bad Request');
    }
  }

  private static transformResponse(res: OSMRRouteResponse): RoutePath {
    if (res.code !== 'Ok' || res.routes.length === 0) {
      throw new Error('Not Found');
    }

    const route = res.routes[0].legs[0];

    return {
      distance: route.distance / 1000,
      duration: route.duration / 60,
      geometry: {
        type: GeometryType.LINE_STRING,
        coordinates: route.steps.map((step) => step.geometry.coordinates).flat(),
      },
      steps: route.steps.map((step) => ({
        distance: step.distance / 1000,
        duration: step.duration / 60,
        point: step.maneuver.location,
        maneuver: step.maneuver.type as Maneuver.TURN_LEFT,
        text: step.name,
      })),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static getParams(_1: MapLocation, __2: MapLocation, ___3: NavigateOptions): string {
    const params = new URLSearchParams();
    params.append('geometries', 'geojson');
    params.append('steps', 'true');

    return params.toString();
  }
}

export default OSMRRoutingService;
