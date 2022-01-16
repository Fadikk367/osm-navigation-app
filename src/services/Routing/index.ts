import GraphhopperRoutingService from './Graphhopper';
import OSMRRoutingService from './OSMR';
import CustomRoutingService from './Custom';
import type { Navigating } from './types';

export const graphhopperRoutingService = new GraphhopperRoutingService();
export const osmrRoutingService = new OSMRRoutingService();
export const customRoutingService = new CustomRoutingService();

export const getRoutingByName = (name: string): Navigating => {
  switch (name) {
    case 'OSMR':
      return osmrRoutingService;
    case 'Graphhopper':
      return graphhopperRoutingService;
    case 'Custom':
      return customRoutingService;
    default:
      return graphhopperRoutingService;
  }
};
