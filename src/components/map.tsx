import React from "react";

const Map = () => {
  return (
    <div className="bg-gray-800 h-[50%] text-white rounded-lg p-6">
      <h2 className="text-xl mb-4">Current Location</h2>
      <img src="/map-placeholder.png" alt="Map" className="w-full rounded-lg" />
    </div>
  );
};

export default Map;
