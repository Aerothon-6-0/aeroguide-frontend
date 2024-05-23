import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup, Polyline } from "react-leaflet";
import { LatLngExpression, LatLngBounds} from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from 'framer-motion';
import AirplaneIcon from "./AirplaneIcon";
interface Bounds {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
  northWest: { lat: number; lng: number };
  southEast: { lat: number; lng: number };
}


const source: LatLngExpression = [1.505, -0.09]; // Example source coordinate
const destination: LatLngExpression = [51.51, -0.1]; // Example destination coordinate
const MapWithBounds: React.FC = () => {
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [startAnimation, setStartAnimation] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<LatLngExpression>(source);
    const handleAnimationStart = () => {
      setStartAnimation(true);
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ position: 'relative', height: '70vh', width: '100vw' }}>
      <MapContainer
        bounds={new LatLngBounds(source, destination)}
        style={{ height: '100%', width: '100%' }}
        // zoomControl={false}
        // doubleClickZoom={false}
        // scrollWheelZoom={false}
        // dragging={false}
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
        {bounds && (
          <>
            <Marker position={[bounds.northEast.lat, bounds.northEast.lng]}>
              <Popup>North East</Popup>
            </Marker>
            <Marker position={[bounds.southWest.lat, bounds.southWest.lng]}>
              <Popup>South West</Popup>
            </Marker>
            <Marker position={[bounds.northWest.lat, bounds.northWest.lng]}>
              <Popup>North West</Popup>
            </Marker>
            <Marker position={[bounds.southEast.lat, bounds.southEast.lng]}>
              <Popup>South East</Popup>
            </Marker>
          </>
        )}
        <GetMapBounds setBounds={setBounds} />
        <Polyline positions={[source, destination]} color="blue" />
        {startAnimation && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'translateX 2000s linear',
                translateX: '100%',
              }}
              initial={{ translateX: '0%' }}
              animate={{ translateX: '100%' }}
              transition={{
                type: 'spring',
                duration: 40, // Adjust the duration here (in seconds)
                stiffness: 10, // Optional: Adjust the stiffness of the spring animation
              }}
              onAnimationComplete={() => {
                setCurrentPosition(destination);
              }}
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
    <button onClick={handleAnimationStart} style={{ marginTop: '10px' }}>
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
