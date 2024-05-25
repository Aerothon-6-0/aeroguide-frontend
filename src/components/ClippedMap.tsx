import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLngExpression, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import AirplaneIcon from "./AirplaneIcon";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getFlightById } from "@/store/actions/flight";
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

const points: LatLngExpression[] = [
  source,
  point1,
  point2,
  point3,
  destination,
];
const interpolate = (start: any, end: any, factor: number) => {
  const lat = start[0] + (end[0] - start[0]) * factor;
  const lng = start[1] + (end[1] - start[1]) * factor;
  return [lat, lng] as LatLngExpression;
};
const getBoundaryPoints = (
  sourceLat: number,
  sourceLong: number,
  destinationLat: number,
  destinationLong: number
) => {
  const buffer = 5;
  const minLat = Math.min(sourceLat, destinationLat) - buffer;
  const maxLat = Math.max(sourceLat, destinationLat) + buffer;
  const minLong = Math.min(sourceLong, destinationLong) - buffer;
  const maxLong = Math.max(sourceLong, destinationLong) + buffer;

  return {
    leftUpper: [minLat, minLong],
    leftLower: [maxLat, minLong],
    rightUpper: [minLat, maxLong],
    rightLower: [maxLat, maxLong],
  };
};
const getBoundsInformation = (src: any, dest: any) => {
  const boundaryPoints = getBoundaryPoints(src[0], src[1], dest[0], dest[1]);
  const northEast: LatLngExpression = [
    boundaryPoints.rightUpper[0],
    boundaryPoints.rightUpper[1],
  ];
  const northWest: LatLngExpression = [
    boundaryPoints.leftUpper[0],
    boundaryPoints.leftUpper[1],
  ];
  const southWest: LatLngExpression = [
    boundaryPoints.leftLower[0],
    boundaryPoints.leftLower[1],
  ];
  const southEast: LatLngExpression = [
    boundaryPoints.rightLower[0],
    boundaryPoints.rightLower[1],
  ];
  const boundObj = {
    north_east: {
      lat: northEast[0],
      long: northEast[1],
    },
    north_west: {
      lat: northWest[0],
      long: northWest[1],
    },
    south_east: {
      lat: southEast[0],
      long: southWest[1],
    },
    south_west: {
      lat: southWest[0],
      long: southWest[1],
    },
  };
  return { northEast, northWest, southWest, southEast, boundObj };
};

const MapWithBounds: React.FC = () => {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [boundsInfo, setBoundsInfo] = useState<any>();
  const [startAnimation, setStartAnimation] = useState(false);
  const [boundaryBound, setBoundaryBound] = useState<any>();
  const flightData: any = useAppSelector((state) => state.flight);

  const dispatch = useAppDispatch();
  const [currentPosition, setCurrentPosition] =
    useState<LatLngExpression>(source);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const params = useParams();
  const [src, setSrc] = useState<any>();
  const [dest, setDest] = useState<any>();

  const animateFlight = (path: LatLngExpression[], duration: number) => {
    const startTime = performance.now();
    const totalSteps = 100;
    // const stepDuration = duration / totalSteps;

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

    const fetchFlightData = async () => {
      try {
        const data: any = await dispatch(
          getFlightById({ flightId: params.flightNum })
        );

        if (data.payload.data) {

          setSrc([
            data.payload.data.flight.origin.location[0],
            data.payload.data.flight.origin.location[1],
          ]);
          setDest([
            data.payload.data.flight.destination.location[0],
            data.payload.data.flight.destination.location[1],
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlightData();
  }, [dispatch, params.flightNum]);





  useEffect(() => {
    const fetchOptimizedRoute = async () => {
      if (src && dest) {
        const { northEast, southEast, southWest, northWest, boundObj } = getBoundsInformation(src, dest);
        console.log(boundObj, 'boundObj')
        setBoundsInfo({ northEast, southEast, southWest, northWest });
        setBoundaryBound(boundObj)

        try {

          const optimalRoute = await axios.post(
            `https://b2e7-103-92-103-55.ngrok-free.app/api/v1/flight/${params.flightNum}`,
            { bounds: boundObj }
          );
          console.log(optimalRoute);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchOptimizedRoute();
  }, [params.flightNum, src]);


  useEffect(() => {
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animationFrame]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <div className="w-30 h-screen">

      </div> */}
      {src && dest && boundsInfo && (
        <div
          style={{ position: "relative", height: "70vh", width: "70vw" }}
          className="bg-black"
        >
          <MapContainer
            bounds={new LatLngBounds(L.latLng(src[0], src[1]), L.latLng(dest[0], dest[1]))}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={L.latLng(src[0], src[1])}>
              <Popup>Source</Popup>
            </Marker>
            <Marker position={L.latLng(dest[0], dest[1])}>
              <Popup>Destination</Popup>
            </Marker>
            <Marker position={boundsInfo?.northEast!}>
              <Popup>North East</Popup>
            </Marker>
            <Marker position={boundsInfo?.southWest!}>
              <Popup>South West</Popup>
            </Marker>
            <Marker position={boundsInfo?.northWest!}>
              <Popup>North West</Popup>
            </Marker>
            <Marker position={boundsInfo?.southEast!}>
              <Popup>South East</Popup>
            </Marker>
            <GetMapBounds setBounds={setBounds} />
            <Polyline positions={[src, dest]} color="blue" />
            {startAnimation && (
              <motion.div
                style={{
                  position: "absolute",
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
      )}
      <button onClick={handleStartAnimation} style={{ marginTop: "10px" }}>
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
