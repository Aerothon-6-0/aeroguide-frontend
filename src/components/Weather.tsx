import React from "react";

const Weather = () => {
  return (
    <div>
      {" "}
      <div className="bg-gray-800 h-[50%] text-white rounded-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">42°C</h1>
          <p className="text-lg">Cloudy</p>
        </div>
        <img src="/weather-icon.png" alt="Weather Icon" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default Weather;
