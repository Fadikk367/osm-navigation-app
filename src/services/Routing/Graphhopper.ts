import axios from 'axios';

import { MapLocation } from 'services/Geocoding/types';

import { GeometryType, GraphhopperRouteResponse, Maneuver, NavigateOptions, Navigating, RoutePath } from './types';

class GraphhopperRoutingService implements Navigating {
  private readonly baseUrl: string;

  private static readonly maneuverBySign: {[key: string]: Maneuver} = {
    '-98': Maneuver.U_TURN,
    '-8': Maneuver.LEFT_U_TURN,
    '-7': Maneuver.KEEP_LEFT,
    '-6': Maneuver.LEAVE_ROUNDABOUT,
    '-3': Maneuver.TURN_SLIGHT_LEFT,
    '-2': Maneuver.TURN_LEFT,
    '-1': Maneuver.TURN_SLIGHT_LEFT,
    '0': Maneuver.CONTINUE,
    '1': Maneuver.TURN_SLIGHT_RIGHT,
    '2': Maneuver.TURN_RIGHT,
    '3': Maneuver.TURN_SHARP_RIGHT,
    '4': Maneuver.ARRIVED,
    '5': Maneuver.UNSPECIFIED,
    '6': Maneuver.ENTER_ROUNDABOUT,
    '7': Maneuver.KEEP_RIGHT,
    '8': Maneuver.U_TURN,
    '*': Maneuver.UNSPECIFIED,
  };

  constructor() {
    this.baseUrl = 'https://graphhopper.com/api/1/route/';
  }

  async navigate(start: MapLocation, destination: MapLocation, options: NavigateOptions): Promise<RoutePath> {
    try {
      const params = GraphhopperRoutingService.getParams(start, destination, options);
      const res = await axios.get<GraphhopperRouteResponse>(`${this.baseUrl}?${params}`);

      return GraphhopperRoutingService.transformResponse(res.data);
    } catch (err) {
      throw new Error('Bad Request');
    }
  }

  private static transformResponse(res: GraphhopperRouteResponse): RoutePath {
    if (res.paths.length === 0) {
      throw new Error('Not found');
    }

    const route = res.paths[0];

    return {
      distance: route.distance / 1000,
      duration: route.time / (1000 * 60),
      geometry: {
        type: GeometryType.LINE_STRING,
        coordinates: route.points.coordinates,
      },
      steps: route.instructions.map((instruction) => ({
        distance: instruction.distance / 1000,
        duration: instruction.time / (1000 * 60),
        point: route.points.coordinates[instruction.interval[0]],
        maneuver: GraphhopperRoutingService.getManeuverBySign(instruction.sign),
        text: instruction.text,
      })),
    };
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

  private static getManeuverBySign(sign: number): Maneuver {
    let maneuver = GraphhopperRoutingService.maneuverBySign[sign];

    if (!maneuver) {
      maneuver = Maneuver.UNSPECIFIED;
    }

    return maneuver;
  }
}

export default GraphhopperRoutingService;
