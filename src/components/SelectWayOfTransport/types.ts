import { Transport } from 'services/Routing/types';

export interface SelectWayOfTransportProps {
  onChange?(value: Transport): void;
  value: Transport;
}
