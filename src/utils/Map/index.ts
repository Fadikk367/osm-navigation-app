import type { MapLocation } from 'services/Geocoding/types';

export const formatMapLocation = ({ city, street, name, housenumber }: MapLocation): string => {
  const infos: string[] = [];

  if (city) {
    infos.push(city);
  }

  if (street) {
    infos.push(street);
  }

  if (housenumber) {
    infos.push(housenumber);
  }

  if (name && name !== street) {
    infos.push(name);
  }

  return infos.join(', ');
};
