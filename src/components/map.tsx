import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
  } from "react-leaflet";
const Map = () => {
  return (
    <div className="bg-blue-900 h-[20%] text-white rounded-lg p-6">
      <h2 className="text-xl mb-4">Current Location</h2>
      <h1 className="text-2xl">New Delhi</h1>
    </div>
  );
};

export default Map;
