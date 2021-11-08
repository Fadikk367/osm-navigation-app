import axios from 'axios';
import { LatLng } from 'leaflet';

import type { GeocodingHit, GeocodingResponse, MapLocation } from './types';

class GeocodingService {
  private readonly baseUrl: string;

  private readonly apiKey: string;

  locale: string;

  constructor() {
    this.baseUrl = 'https://graphhopper.com/api/1/geocode';
    this.apiKey = '9b5dc8fa-e030-418a-8011-17472be5b1bb';
    this.locale = 'en';
  }

  async reverse(point: LatLng): Promise<MapLocation> {
    const params = this.getParams(point);
    const res = await axios.get<GeocodingResponse>(`${this.baseUrl}?${params}`);
    if (res.data.hits.length > 0) {
      return GeocodingService.convertHitToLocation(res.data.hits[0]);
    }

    throw new Error('No locations match');
  }

  async getLocationsNearby(point: LatLng): Promise<MapLocation[]> {
    const params = this.getParams(point);
    const res = await axios.get<GeocodingResponse>(`${this.baseUrl}?${params}`);

    return res.data.hits.map((hit) => GeocodingService.convertHitToLocation(hit));
  }

  private getParams(point: LatLng): string {
    const params = new URLSearchParams({
      point: `${point.lat},${point.lng}`,
      locale: this.locale,
      key: this.apiKey,
      reverse: 'true',
    });

    return params.toString();
  }

  private static convertHitToLocation(hit: GeocodingHit): MapLocation {
    return {
      coordinates: hit.point,
      country: hit.country,
      state: hit.state,
      city: hit.city,
      postcode: hit.postcode,
      street: hit.street,
      housenumber: hit.housenumber,
      name: hit.name,
    };
  }
}

export default GeocodingService;
