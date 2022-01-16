import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import type { MapLocation } from 'services/Geocoding/types';
import { Maneuver } from 'services/Routing/types';

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

export const getArrowByManeuver = (maneuver: Maneuver): typeof ArrowForwardIcon => {
  switch (maneuver) {
    case Maneuver.TURN_RIGHT:
    case Maneuver.TURN_SLIGHT_RIGHT:
    case Maneuver.TURN_SHARP_RIGHT: return ArrowForwardIcon;
    case Maneuver.TURN_LEFT:
    case Maneuver.TURN_SLIGHT_LEFT:
    case Maneuver.RUTN_SHARP_LEFT: return ArrowBackIcon;
    case Maneuver.CONTINUE:
    case Maneuver.UNSPECIFIED:
    case Maneuver.ENTER_ROUNDABOUT:
    case Maneuver.LEAVE_ROUNDABOUT: return ArrowUpwardIcon;
    case Maneuver.U_TURN:
    case Maneuver.LEFT_U_TURN:
    case Maneuver.RIGHT_U_TURN: return ArrowDownwardIcon;
    default: return ArrowUpwardIcon;
  }
};
