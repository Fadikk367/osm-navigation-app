import { useContext } from 'react';

import { RoutingContext } from 'providers/RoutingProvider/RoutingProvider';
import { IRoutingContext } from 'providers/RoutingProvider/types';

const useRouting = (): IRoutingContext => {
  const routing = useContext(RoutingContext);

  if (!routing) {
    throw new Error('Routing context doeas not exist');
  }

  return routing;
};

export default useRouting;
