import GraphhopperRoutingService from './Graphhopper';
import OSMRRoutingService from './OSMR';
import type { Navigating } from './types';

export const graphhopperRoutingService = new GraphhopperRoutingService();
export const osmrRoutingService = new OSMRRoutingService();

export const getRoutingByName = (name: string): Navigating => {
  switch (name) {
    case 'OSMR':
      return osmrRoutingService;
    case 'Graphhopper':
      return graphhopperRoutingService;
    default:
      return graphhopperRoutingService;
  }
};
