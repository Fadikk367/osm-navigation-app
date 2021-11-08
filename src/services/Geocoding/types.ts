/* eslint-disable camelcase */

export interface Place {
  country: string;
  state?: string;
  city?: string;
  postcode?: string;
  street?: string;
  housenumber?: string;
  name?: string;
}

export interface GeocodingHit extends Place {
  point: {
    lat: number;
    lng: number;
  };
  osm_id: string;
  osm_type: string;
  osm_key: string;
}

export interface MapLocation extends Place {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GeocodingResponse {
  hits: GeocodingHit[];
  locale: string;
}
