import React from "react";

const FlightStatus = () => {
  return (
    <div className="bg-gray-800 w-[50%] text-white rounded-lg p-6">
      <h2 className="text-xl mb-4">Flight Status</h2>
      <div className="flex items-center justify-center mb-4">
        <img src="/plane-icon.png" alt="Plane" className="w-16 h-16 mr-4" />
        <p className="text-2xl">3 Hours Remaining</p>
      </div>
      <div className="text-center">
        <p>4:16 AM (AUH)</p>
        <p>9:28 AM (JFK)</p>
      </div>
    </div>
  );
};

export default FlightStatus;
