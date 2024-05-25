import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Weather from "./Weather";
import axios from "axios";
import Map from "./map";
import FlightStatus from "./flight-status"; // Ensuring import name doesn't clash with Map component
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getFlightById } from "@/store/actions/flight";

// const Dashboard: React.FC = () => {
//   return (
//     <div className="flex h-screen">
//       <aside className="w-64 bg-gray-800 p-6">
//         <nav className="flex flex-col space-y-4">
//           <Link to="/" className="text-2xl text-white">Home</Link>
//           <Link to="/ClippedMap" className="text-2xl text-white">Map</Link>
//           <Link to="/Dashboard" className="text-2xl text-white font-bold">Dashboard</Link>
//         </nav>
//       </aside>
//       <main className="flex-grow p-6">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/flight/:flightNum/route" element={<ClippedMap />} />
//           <Route path="/flight/:flightNum/info" element={<DashboardContent/>} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

const DashboardContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [flightInfo, setFlightInfo] = useState<any>();
  const dispatch = useAppDispatch();
  const [weatherInfo, setWeatherInfo] = useState<any>();
  const params = useParams();
  console.log(params);
  const flightData: any = useAppSelector((state) => state.flight);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const response: any = await dispatch(
          getFlightById({ flightId: params.flightNum })
        );
        console.log(response.payload.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    fetchFlights();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(weatherInfo);

  return (
    <div className="flex justify-between w-screen h-screen p-5 bg-gray-800">
      {/* Weather Section */}

      <div className="flex-col flex h-full w-[40%] justify-between space-y-10">
        <div className="h-1/2">
          <Weather weatherInfo={weatherInfo} />
        </div>
        <Map />
      </div>
      {/* Flight Section */}
      <FlightStatus />
      {/* Media Player Section */}
    </div>
  );
};

export default DashboardContent;

// import React, { useState } from "react";
// import { Link, Route, Routes } from "react-router-dom";
// import Weather from "./Weather";
// import Map from "./map";
// import FlightStatus from "./flight-status";
// import Landing from "./LandingPage";

// const Dashboard: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <div className={`fixed inset-0 flex z-40 ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

//         <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
//           <div className="absolute top-0 right-0 -mr-12 pt-2">
//             <button
//               className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <span className="sr-only">Close sidebar</span>
//               <div className="text-white">&times;</div>
//             </button>
//           </div>
//           <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
//             <nav className="mt-5 px-2 space-y-1">
//               <Link to="/" className="text-2xl text-white block px-3 py-2 rounded-md">Home</Link>
//               <Link to="/map" className="text-2xl text-white block px-3 py-2 rounded-md">Map</Link>
//               <Link to="/dashboard" className="text-2xl text-white block px-3 py-2 rounded-md font-bold">Dashboard</Link>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col w-0 flex-1 overflow-hidden">
//         <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 shadow">
//           <button
//             className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <span className="sr-only">Open sidebar</span>
//             <div className="text-white">&#9776;</div>
//           </button>
//           <div className="flex-1 px-4 flex justify-between">
//             <div className="flex-1 flex">
//               <h1 className="text-3xl text-white my-auto">Dashboard</h1>
//             </div>
//           </div>
//         </div>

//         <main className="flex-grow overflow-y-auto bg-gray-900 p-6">
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/map" element={<Map />} />
//             <Route path="/dashboard" element={<DashboardContent />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// const DashboardContent: React.FC = () => {
//   return (
//     <div className="flex justify-between w-full h-full p-5">
//       {/* Weather Section */}
//       <div className="flex-col flex h-full w-[40%] justify-between space-y-10">
//         <div className="h-1/2">
//           <Weather />
//         </div>
//         <Map />
//       </div>
//       {/* Flight Section */}
//       <FlightStatus />
//       {/* Media Player Section */}
//     </div>
//   );
// };

// export default Dashboard;
