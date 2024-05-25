// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuIndicator,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     NavigationMenuViewport,
//   } from "@/components/ui/navigation-menu"

//   import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
//   import { MdFlightTakeoff } from "react-icons/md";
import Data from "./Data.ts";
import { Badge } from "./ui/badge.tsx";
import { useNavigate } from "react-router-dom";
// const LandingPage = () => {
//     const navigate = useNavigate();

//   const handleRowClick = (flight:any) => {
//     const { FlightNum, Source, Destination, Time } = flight;
//     navigate(`/flight/${FlightNum}/${Source}/${Destination}/${Time}`);
//   };

//   return (
//     <div className="w-screen h-screen">
//         <div className="w-full h-3/5 bg-[url('./src/images/bg-flight.jpeg')] bg-cover bg-bottom">
//             <div className="max-w-4/5 h-30 p-10 flex justify-between">
//                 <div className="flex items-center gap-3">
//                     <img src="/public/aeroguide_logo.png" className="w-10 h-10"/>
//                     <h1 className="text-2xl font-bold text-white">AeroGuide</h1>
//                 </div>
//                 <NavigationMenu>
//                     <NavigationMenuList>
//                         <NavigationMenuItem className="bg-transparent">
//                             <NavigationMenuTrigger className="text-lg">Home</NavigationMenuTrigger>
//                             <NavigationMenuContent>
//                                 <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
//                             </NavigationMenuContent>
//                         </NavigationMenuItem>

//                         <NavigationMenuItem>
//                             <NavigationMenuTrigger className="text-lg">About Us</NavigationMenuTrigger>
//                             <NavigationMenuContent>
//                                 <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
//                             </NavigationMenuContent>
//                         </NavigationMenuItem>

//                         <NavigationMenuItem>
//                             <NavigationMenuTrigger className="text-lg">Flights</NavigationMenuTrigger>
//                             <NavigationMenuContent>
//                                 <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
//                             </NavigationMenuContent>
//                         </NavigationMenuItem>
//                     </NavigationMenuList>
//                 </NavigationMenu>
//             </div>
//         </div>
//         <div className="max-w-4/5 bg-blue-50 p-10">
//             <div className="flex justify-center items-center gap-2 mb-5">
//                 <MdFlightTakeoff className="w-10 h-10"/>
//                 <h1 className="text-xl font-semibold">Upcoming Flights</h1>
//             </div>
// <Table>
//     <TableHeader>
//         <TableRow>
//         <TableHead className="w-fit">Time</TableHead>
//         <TableHead>Flight Number</TableHead>
//         <TableHead>Source</TableHead>
//         <TableHead>Destination</TableHead>
//         <TableHead>Flight Info</TableHead>
//         </TableRow>
//     </TableHeader>
//     <TableBody>
//         {Data.map((flight, index)=>(
//         <TableRow key={index}>
//         <TableCell className="font-medium">{flight.Time}</TableCell>
//         <TableCell>{flight.FlightNum}</TableCell>
//         <TableCell>{flight.Source}</TableCell>
//         <TableCell>{flight.Destination}</TableCell>
//         <TableCell>
//         <Badge variant="outline" onClick={() => handleRowClick(flight)} className="cursor-pointer">Check</Badge>
//         </TableCell>
//         </TableRow>
//         ))}
//     </TableBody>
// </Table>

//         </div>
//     </div>
//   );
// };

// export default LandingPage;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdFlightTakeoff } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

import moment from "moment-timezone";

const LandingPage = () => {
  const navigate = useNavigate();
  const convertUTCToIST = (utcDateStr: string): string => {
    // Parse the UTC date string and convert to IST using moment-timezone
    const istDate = moment.utc(utcDateStr).tz("Asia/Kolkata");
    return istDate.format("YYYY-MM-DD HH:mm:ss");
  };
  const handleRowClick = (flight: any) => {
    const { id, Source, Destination, Time } = flight;
    navigate(`/flight/${id}/info`);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [flightInfo, setFlightInfo] = useState<any>();
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5500/api/v1/flight"
        );
        console.log(response);

        setFlightInfo(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchFlights();
  }, []);
  console.log(flightInfo);

  const renderFlightTable = () => {
    if (loading) return <div>Loading...</div>;
    else if (!flightInfo) {
      <div>No Flights available</div>;
    } else {
      return (
        flightInfo?.length > 0 &&
        flightInfo?.map((flight: any, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-2">
                <img src="/src/images/delhi.png" className="w-10 h-10" />
                <div className="flex flex-col gap-2">
                  <h3>{convertUTCToIST(flight.startTime).substring(11, 19)}</h3>
                  <h6 className="text-[#0f172a] text-lg w-[80px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {flight.Source}
                  </h6>
                </div>
                <img src="/src/images/route.png" className="w-28" />
                <div className="flex flex-col gap-2">
                  <h3>{convertUTCToIST(flight.endTime).substring(11, 19)}</h3>
                  <h6 className="text-[#0f172a] text-lg w-[70px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {flight.Destination}
                  </h6>
                </div>
                <img src="/src/images/delhi.png" className="w-10 h-10" />
              </div>
            </TableCell>
            <TableCell className="text-lg">{flight.flightNumber}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                onClick={() => handleRowClick(flight)}
                className="cursor-pointer p-3"
              >
                Check
              </Badge>
            </TableCell>
          </TableRow>
        ))
      );
    }
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="w-screen h-screen font-poppins">
      <div className="w-full h-30 p-10 flex items-center gap-3 justify-around">
        <div className="flex items-center gap-3">
          <img src="/public/aeroguide_logo.png" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-[#0f172a]">AeroGuide</h1>
        </div>
        <ul className="flex gap-8">
          <li className="font-medium text-[#64748b] duration-0.2 hover:text-[#0f172a]">
            Home
          </li>
          <li className="font-medium text-[#64748b] duration-0.2 hover:text-[#0f172a]">
            About Us
          </li>
          <li className="font-medium text-[#64748b] duration-0.2 hover:text-[#0f172a]">
            Product
          </li>
          <li className="font-medium text-[#64748b] duration-0.2 hover:text-[#0f172a]">
            Team
          </li>
        </ul>
        <button className="rounded-2xl bg-[#3d5cb8] p-3 text-white">
          Contact
        </button>
      </div>
      <header className="max-w-1200 flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-semibold text-[#0f172a] leading-10">
          Your Path to Perfection Starts Here.
        </h1>
        <img src="/src/images/header.jpg" alt="header" />
      </header>
      <div className="max-w-1200 p-10">
        <div className="flex justify-center items-center gap-2 mb-5">
          <MdFlightTakeoff className="w-10 h-10" />
          <h1 className="text-xl font-semibold text-[#0f172a]">
            Upcoming Flights
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit text-xl">Destination</TableHead>
              <TableHead className="w-fit text-xl">Flight Number</TableHead>
              <TableHead className="w-fit text-xl">Get Flight Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderFlightTable()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LandingPage;
