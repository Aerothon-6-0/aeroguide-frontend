import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    Popup,
    Polyline,
  } from "react-leaflet";
const Weather = ({ weatherInfo }: any) => {
  const weather = weatherInfo?.current;
  console.log(weather);

  return (
    <div>
      <div className="bg-blue-900 h-[20%] text-white rounded-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{22.2}</h1>
          <p className="text-xl">Cloudy</p>
        </div>
        <img src="/src/images/cloud_cover.png" alt="Weather Icon" className="w-20 h-20"/>
      </div>
      <MapContainer
            style={{ height: "59vh", width: "46vw" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[11.505, 77.09]}>
              <Popup>Source</Popup>
            </Marker>
            <Marker position={[51.51, -0.1]}>
              <Popup>Destination</Popup>
            </Marker>
        </MapContainer>
    </div>
  );
};

export default Weather;
