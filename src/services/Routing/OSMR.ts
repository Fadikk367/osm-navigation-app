import axios from 'axios';

import { MapLocation } from 'services/Geocoding/types';

import type { GraphhopperRouteResponse, NavigateOptions, Navigating, RoutePath } from './types';

class OSMRRoutingService implements Navigating {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://router.project-osrm.org/route/v1';
  }

  async navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath> {
    try {
      const params = OSMRRoutingService.getParams(start, destination, options);
      const encodedPoints =
        `${start.coordinates.lng},${start.coordinates.lat}` +
        ';' +
        `${destination.coordinates.lng},${destination.coordinates.lat}`;

      const url = `${this.baseUrl}/${options.transport}/${encodedPoints}?${params}`;
      const res = await axios.get<GraphhopperRouteResponse>(url);

      return res.data;
    } catch (err) {
      throw new Error('Bad Request');
    }
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
