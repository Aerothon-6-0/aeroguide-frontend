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
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getFlightById } from "@/store/actions/flight";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
  console.log(start, end, factor);
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
  const [path1, setPath1] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const source: LatLngExpression = [11.505, 77.09];
  const dispatch = useAppDispatch();
  const [currentPosition, setCurrentPosition] =
    useState<LatLngExpression>(source);

  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const params = useParams();
  const [src, setSrc] = useState<any>();
  const [dest, setDest] = useState<any>();

  const animateFlight = (path: LatLngExpression[], duration: number) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
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
      setCurrentPosition(src);
      const newPath = [...path1].reverse()
      console.log(newPath)
      animateFlight([src, ...newPath, dest], 10000); // 10 seconds for the entire flight path
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
          // setCurrentPosition(L.latLng(data.payload.data.flight.origin.location[0], data.payload.data.flight.origin.location[1]));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlightData();
  }, [params.flightNum]);

  useEffect(() => {
    const fetchOptimizedRoute = async () => {
      if (src && dest) {
        const { northEast, southEast, southWest, northWest, boundObj } =
          getBoundsInformation(src, dest);

        setBoundsInfo({ northEast, southEast, southWest, northWest });
        setBoundaryBound(boundObj);

        try {
          setLoading(true);
          const optimalRoute = await axios.post(
            `http://localhost:5500/api/v1/flight/${params.flightNum}`,
            { bounds: boundObj }
          );

          setPath1(optimalRoute.data.path1.map((path: any) => [path.lat, path.long]))
          setLoading(false)
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
    <div className="flex w-screen items-center">
      <div className="flex flex-col p-10 w-[30%] h-screen bg-blue-200 shadow-3xl gap-3">
        <Link to={`/flight/${params.flightNum}/info`}>Back</Link>
        <h1 className="mt-10 ml-10 text-2xl font-bold mb-20">
          Emergency Conditions
        </h1>

        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Fuel Emergency</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Medical Emergency</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Flight Emergency</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Security Emergency</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Communication Emergency</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Emergency Conditions</h1>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Checkbox />
          <h1 className="font-semibold">Hijack</h1>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <Checkbox />
          <h1 className="font-semibold">
            Weather Emergency - Visibility, Storm
          </h1>
        </div>
        <button onClick={handleStartAnimation} style={{ marginTop: "150px" }}>
          <Badge variant="outline" className="p-3 text-blue-900">Start Animation</Badge>
        </button>
      </div>
      {loading ? <div>Loading...</div> : src && dest && boundsInfo && path1 && currentPosition && (
        <div
          style={{ position: "relative", height: "100vh" }}
          className="bg-black w-[70%]"
        >
          <MapContainer
            bounds={
              new LatLngBounds(
                L.latLng(src[0], src[1]),
                L.latLng(dest[0], dest[1])
              )
            }
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
            <Polyline positions={[src, ...path1, dest]} color="blue" />
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
