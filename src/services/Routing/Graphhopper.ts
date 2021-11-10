import axios from 'axios';

import { MapLocation } from 'services/Geocoding/types';

import type { GraphhopperRouteResponse, NavigateOptions, Navigating, RoutePath } from './types';

class GraphhopperRoutingService implements Navigating {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://graphhopper.com/api/1/route/';
  }

  async navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath> {
    try {
      const params = GraphhopperRoutingService.getParams(start, destination, options);
      const res = await axios.get<GraphhopperRouteResponse>(`${this.baseUrl}?${params}`);

      return res.data;
    } catch (err) {
      throw new Error('Bad Request');
    }
  }

  private static getParams(start: MapLocation, destination: MapLocation, options: NavigateOptions): string {
    const params = new URLSearchParams();
    params.append('point', `${start.coordinates.lat},${start.coordinates.lng}`);
    params.append('point', `${destination.coordinates.lat},${destination.coordinates.lng}`);
    params.append('vehicle', options.transport);
    params.append('points_encoded', 'false');
    params.append('type', 'json');
    params.append('key', '9b5dc8fa-e030-418a-8011-17472be5b1bb');
    params.append('debug', 'true');

    return params.toString();
  }
}

export default GraphhopperRoutingService;
