import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { MdFlightTakeoff } from "react-icons/md";
  import Data from "./Data.ts";
  import { Badge } from "./ui/badge.tsx";
  import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();

  const handleRowClick = (flight:any) => {
    const { FlightNum, Source, Destination, Time } = flight;
    navigate(`/flight/${FlightNum}/${Source}/${Destination}/${Time}`);
  };

  return (
    <div className="w-screen h-screen">
        <div className="w-full h-3/5 bg-[url('./src/images/bg-flight.jpeg')] bg-cover bg-bottom">
            <div className="max-w-4/5 h-30 p-10 flex justify-between">
                <div className="flex items-center gap-3">
                    <img src="/public/aeroguide_logo.png" className="w-10 h-10"/>
                    <h1 className="text-2xl font-bold text-white">AeroGuide</h1>
                </div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem className="bg-transparent">
                            <NavigationMenuTrigger className="text-lg">Home</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg">About Us</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg">Flights</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className="p-10">Our Product</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
        <div className="max-w-4/5 bg-blue-50 p-10">
            <div className="flex justify-center items-center gap-2 mb-5">
                <MdFlightTakeoff className="w-10 h-10"/>
                <h1 className="text-xl font-semibold">Upcoming Flights</h1>
            </div>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-fit">Time</TableHead>
                <TableHead>Flight Number</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Flight Info</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Data.map((flight, index)=>(
                <TableRow key={index}>
                <TableCell className="font-medium">{flight.Time}</TableCell>
                <TableCell>{flight.FlightNum}</TableCell>
                <TableCell>{flight.Source}</TableCell>
                <TableCell>{flight.Destination}</TableCell>
                <TableCell>
                <Badge variant="outline" onClick={() => handleRowClick(flight)} className="cursor-pointer">Check</Badge>
                </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>

        </div>
    </div>
  );
};

export default LandingPage;
