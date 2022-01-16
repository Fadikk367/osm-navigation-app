/* eslint-disable no-console */
import axios from 'axios';
import { LatLngBoundsLiteral } from 'leaflet';

import { MapLocation } from 'services/Geocoding/types';

import { GeometryType, NavigateOptions, Navigating, RoutePath } from './types';

interface CustomRoutingResponse {
  distance: number;
  calculationTime: number;
  coordinates: {
    lat: number;
    lng: number;
  }[];
}

class CustomRoutingService implements Navigating {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8000/route';
  }

  async navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath> {
    try {
      const params = CustomRoutingService.getParams(start, destination, options);
      const encodedPoints =
        `from=${start.coordinates.lat},${start.coordinates.lng}` +
        '&' +
        `to=${destination.coordinates.lat},${destination.coordinates.lng}`;

      const url = `${this.baseUrl}?${encodedPoints}&${params}`;
      const res = await axios.get<CustomRoutingResponse>(url);

      console.log(res.data);

      return CustomRoutingService.transformResponse(res.data);
    } catch (err) {
      console.log({ err });
      throw new Error('Bad Request');
    }
  }

  async getSupprotedBounds(): Promise<LatLngBoundsLiteral> {
    const res = await axios.get(`${this.baseUrl}/bounds`);
    return res.data.bounds;
  }

  private static transformResponse(res: CustomRoutingResponse): RoutePath {
    return {
      distance: res.distance,
      duration: 0,
      geometry: {
        type: GeometryType.LINE_STRING,
        coordinates: res.coordinates.map((point) => [point.lng, point.lat]),
      },
      steps: [],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static getParams(_1: MapLocation, __2: MapLocation, ___3: NavigateOptions): string {
    const params = new URLSearchParams();
    params.append('implementation', 'Plain');

    return params.toString();
  }
}

export default CustomRoutingService;
