
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup, Polyline } from "react-leaflet";
import { LatLngExpression, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from 'framer-motion';
import AirplaneIcon from "./AirplaneIcon";
import axios from "axios"
interface Bounds {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
  northWest: { lat: number; lng: number };
  southEast: { lat: number; lng: number };
}

const source: LatLngExpression = [11.505, 77.09];
const point1: LatLngExpression = [44.4268, 26.1025];
const point2: LatLngExpression = [41.8967, 12.4822];
const point3: LatLngExpression = [39.9334, 32.8597];
const destination: LatLngExpression = [51.51, -0.1];

const points: LatLngExpression[] = [source, point1, point2, point3,destination];
const interpolate = (start: any, end: any, factor: number) => {
  const lat = start[0] + (end[0] - start[0]) * factor;
  const lng = start[1] + (end[1] - start[1]) * factor;
  return [lat, lng] as LatLngExpression;
};

const MapWithBounds: React.FC = () => {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<LatLngExpression>(source);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [boundsInfo, setBoundsInfo] = useState<any>();


  useEffect(() => {
    const fetchBounds = async () => {
      try {
    setLoading(true)
        const response = await axios.post(
          "https://aeroguide-backend.onrender.com/api/v1/flight/:id"
        );
        console.log(response);
        
        setBoundsInfo(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchBounds();
  }, []);
  const animateFlight = (path: LatLngExpression[], duration: number) => {
    const startTime = performance.now();
    const totalSteps = 100;
    const stepDuration = duration / totalSteps;

    const animate = (time: number) => {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const segment = Math.floor(progress * (path.length - 1));
      const segmentProgress = (progress * (path.length - 1)) % 1;

      const start = path[segment];
      const end = path[segment + 1] || path[segment];

      const position = interpolate(start, end, segmentProgress);
      setCurrentPosition(position);

      if (progress < 1) {
        setAnimationFrame(requestAnimationFrame(animate));
      } else {
        setAnimationFrame(null);
        setStartAnimation(false);
      }
    };

    setAnimationFrame(requestAnimationFrame(animate));
  };

  const handleStartAnimation = () => {
    if (!startAnimation) {
      setStartAnimation(true);
      animateFlight(points, 10000); // 10 seconds for the entire flight path
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animationFrame]);

  const getBoundaryPoints = (sourceLat:number, sourceLong:number, destinationLat:number, destinationLong:number) => {
    const buffer = 5
    const minLat = Math.min(sourceLat,destinationLat) - buffer;
    const maxLat = Math.max(sourceLat,destinationLat) + buffer;
    const minLong = Math.min(sourceLong,destinationLong) - buffer;
    const maxLong = Math.max(sourceLong,destinationLong) + buffer;

    return {
      "leftUpper" : [minLat,minLong],
      "leftLower" : [maxLat,minLong],
      "rightUpper" : [minLat,maxLong],
      "rightLower" : [maxLat,maxLong]
    };

  }


  const boundaryPoints = getBoundaryPoints(source[0],source[1],destination[0],destination[1])
  const northEast:LatLngExpression = [boundaryPoints.rightUpper[0],boundaryPoints.rightUpper[1]];
  const northWest:LatLngExpression = [boundaryPoints.leftUpper[0],boundaryPoints.leftUpper[1]];
  const southWest:LatLngExpression = [boundaryPoints.leftLower[0],boundaryPoints.leftLower[1]];
  const southEast:LatLngExpression = [boundaryPoints.rightLower[0],boundaryPoints.rightLower[1]];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', height: '70vh', width: '100vw' }}>
        <MapContainer
          bounds={new LatLngBounds(source, destination)}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={source}>
            <Popup>Source</Popup>
          </Marker>
          <Marker position={destination}>
            <Popup>Destination</Popup>
          </Marker>
          <Marker position={northEast}>
            <Popup>North East</Popup>
          </Marker>
          <Marker position={southWest}>
            <Popup>South West</Popup>
          </Marker>
          <Marker position={northWest}>
            <Popup>North West</Popup>
          </Marker>
          <Marker position={southEast}>
            <Popup>South East</Popup>
          </Marker>
          <GetMapBounds setBounds={setBounds} />
          <Polyline positions={points} color="blue" />
          {startAnimation && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              animate={{}}
            >
              <Marker position={currentPosition} icon={AirplaneIcon} />
            </motion.div>
          )}
        </MapContainer>
        {bounds && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "white",
              padding: "10px",
            }}
          >
            <h4>Visible Map Bounds</h4>
            <p>
              NorthEast: {bounds.northEast.lat}, {bounds.northEast.lng}
            </p>
            <p>
              SouthWest: {bounds.southWest.lat}, {bounds.southWest.lng}
            </p>
            <p>
              NorthWest: {bounds.northWest.lat}, {bounds.northWest.lng}
            </p>
            <p>
              SouthEast: {bounds.southEast.lat}, {bounds.southEast.lng}
            </p>
          </div>
        )}
      </div>
      <button onClick={handleStartAnimation} style={{ marginTop: '10px' }}>
        Start Animation
      </button>
    </div>
  );
};

const GetMapBounds: React.FC<{
  setBounds: React.Dispatch<React.SetStateAction<Bounds | null>>;
}> = ({ setBounds }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const updateBounds = () => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();

      setBounds({
        northEast: { lat: northEast.lat, lng: northEast.lng },
        southWest: { lat: southWest.lat, lng: southWest.lng },
        northWest: { lat: northWest.lat, lng: northWest.lng },
        southEast: { lat: southEast.lat, lng: southEast.lng },
      });
    };

    updateBounds();

    map.on("moveend", updateBounds);

    return () => {
      map.off("moveend", updateBounds);
    };
  }, [map, setBounds]);

  return null;
};

export default MapWithBounds;