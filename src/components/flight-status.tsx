import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const FlightStatus = () => {
    const params = useParams()
  return (
    <div className="flex flex-col items-center w-[30%] bg-blue-900 rounded-lg p-10 gap-">
        <h1 className="text-xl text-white">Flight Status</h1>
        <img src="/src/images/planeTop.png" className="h-80"></img>
        <Link
        to={`/flight/${params.flightNum}/route`}
        className="text-2xl text-white block px-3 py-2 rounded-md cursor-pointer"
      >
        Check Route
      </Link>
    </div>
  );
};

export default FlightStatus;
