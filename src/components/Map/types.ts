import { MarkerProps } from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet';

export interface MapProps extends MapEventsProps {
  markers?: MarkerProps[];
}

export interface MapEventsProps {
  onClick?(e: LeafletMouseEvent): void;
}
