import React from "react";
import Weather from "./Weather";
import Map from "./map";
import FlightStatus from "./flight-status";

const Dashboard: React.FC = () => {
  return (
    <div className="flex justify-between w-full h-screen p-5">
      {/* Weather Section */}
      <div className="flex-col flex h-full w-[40%] justify-between space-y-10">
        <div className="h-1/2">
          <Weather />
        </div>

        <Map />
      </div>
      {/* Flight Section */}
      <FlightStatus />

      {/* Media Player Section */}
    </div>
  );
};

export default Dashboard;
