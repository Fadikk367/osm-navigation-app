/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { MarkerProps, Polyline } from 'react-leaflet';

import pinIcon from 'images/pin.png';
import { Icon, LatLng, LeafletMouseEvent, PointTuple } from 'leaflet';

import { Map } from 'components';

interface GraphhopperInstruction {
  distance: number;
  heading: number;
  sign: number;
  interval: [number, NumberConstructor];
  text: string;
  time: number;
  // street_name: string
}

interface GraphhopperPath {
  distance: number;
  weight: number;
  time: number;
  transfers: number;
  // points_encoded: boolean;
  bbox: [number, number, number, number];
  points: {
    type: string;
    coordinates: PointTuple[];
  };
  instructions: GraphhopperInstruction[];
  ascend: number;
  descend: number;
}
interface GraphhopperRouteResponse {
  info: {
    copyrights: string;
    took: number;
  };
  paths: GraphhopperPath[];
}

const baseUrl = 'https://graphhopper.com/api/1/route';
const routingOptions = 'vehicle=car&points_encoded=false&debug=true&key=9b5dc8fa-e030-418a-8011-17472be5b1bb&type=json';

const Home: React.FC = () => {
  const [startPoint, setStartPoint] = useState<LatLng>();
  const [endPoint, setEndPoint] = useState<LatLng>();
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

  const pathToStart = routePoints.length && startPoint ? [startPoint, routePoints[0]] : [];
  const pathFromEnd = routePoints.length && endPoint ? [endPoint, routePoints[routePoints.length - 1]] : [];

  const parseRoutePoints = (res: GraphhopperRouteResponse): void => {
    if (res.paths.length >= 1) {
      setRoutePoints(res.paths[0].points.coordinates.map((point) => [point[1], point[0]]));
    }
  };

  useEffect(() => {
    const newMarkers: MarkerProps[] = [];

    if (startPoint) {
      newMarkers.push({
        position: startPoint,
        icon: new Icon({
          iconUrl: pinIcon,
          iconSize: [42, 42],
        }),
      });
    }

    if (endPoint) {
      newMarkers.push({
        position: endPoint,
        icon: new Icon({
          iconUrl: pinIcon,
          iconSize: [42, 42],
        }),
      });
    }

    if (startPoint && endPoint) {
      const urlParams = new URLSearchParams(routingOptions);
      urlParams.append('point', `${startPoint.lat},${startPoint.lng}`);
      urlParams.append('point', `${endPoint.lat},${endPoint.lng}`);

      fetch(`${baseUrl}?${urlParams}`)
        .then((res) => res.json())
        .then((data) => parseRoutePoints(data))
        .catch((err) => console.error(err));
    }

    setMarkers(newMarkers);
  }, [startPoint, endPoint]);

  const handleMapClick = (e: LeafletMouseEvent): void => {
    if (!startPoint && !endPoint) {
      setStartPoint(e.latlng);
    } else if (startPoint && !endPoint) {
      setEndPoint(e.latlng);
    } else if (startPoint && endPoint) {
      setStartPoint(undefined);
      setEndPoint(undefined);
      setRoutePoints([]);
    }
  };

  return (
    <Map onClick={handleMapClick} markers={markers}>
      <Polyline positions={routePoints} color="#1976d2" weight={5} />
      <Polyline positions={pathToStart} color="#b4b4b4" weight={5} />
      <Polyline positions={pathFromEnd} color="#b4b4b4" weight={5} />
    </Map>
  );
};

export default Home;
