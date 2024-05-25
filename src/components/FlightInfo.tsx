import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaRegSnowflake } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { Badge } from "@/components/ui/badge"
import { MdVisibility } from "react-icons/md";
import { FaCloudRain } from "react-icons/fa";
import { BsCloudFogFill } from "react-icons/bs";
import { RiGpsFill } from "react-icons/ri";
import { MdOutlineNoiseControlOff } from "react-icons/md";
import { FcElectronics } from "react-icons/fc";
import { MdFlightLand } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { WeatherInfo } from "../types.ts"
import {time, date} from "../lib/utils.ts";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import MapWithBounds from './ClippedMap.tsx'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks.ts";
import { getFlightById } from "@/store/actions/flight.ts";
const FlightInfo = () => {
    const navigate = useNavigate();
    const { flightNum, source, destination, Time } = useParams();
    const flightData = useAppSelector(state => state.flight)
    const [weather, setWeather] = useState<WeatherInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const data = await dispatch(getFlightById({ flightId: flightNum }));
                console.log(data)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const handleRoute = (id: number) => {
        navigate(`/flight/${id}/route`);
    }

    // useEffect(() => {
    //     console.log(flightData)
    // },[flightData])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (

        flightData &&
        <div className="w-screen min-h-screen">
            <section className="w-full h-full flex flex-col items-center mb-20">
                
                <h3 className="text-center text-indigo-400 mt-10">Flight {flightData?.flightData?.flight.flightNumber}</h3>
                <div className="flex w-full mt-10 shadow-3xl p-8 items-center justify-evenly">
                    <div className="flex flex-col">
                        <h4 className="text-xs"> Scheduled{date(flightData?.flightData?.flight.scheduledDeparture)}</h4>
                        <h1 className="text-2xl">{time(flightData?.flightData?.flight.scheduledDeparture)}</h1>
                        <h4 className="text-xs">{time(flightData?.flightData?.flight.ActualDeparture)}</h4>
                        <h4 className="text-xs text-gray-400">{source}</h4>
                    </div>
                    <div className="flex flex-col w-80">
                        <h4 className="self-center text-amber-400">{flightData?.flightData?.flight.status}</h4>
                        <div className="bg-gray-400 w-full h-0.5 flex mt-5">
                            <img src="/src/images/flight.png" className="w-7 h-7 m-auto self-center" />
                        </div>
                        <div className="flex justify-between">
                            <h4 className="text-xs">11h 0m</h4>
                            <h4 className="text-xs">9048 Km</h4>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs"> Scheduled {date(flightData?.flightData?.flight.scheduledArrival)}</h4>
                        <h1 className="text-2xl">{time(flightData?.flightData?.flight.scheduledArrival)}</h1>
                        <h4 className="text-xs">{time(flightData?.flightData?.flight.actualArrival)}</h4>
                        <h4 className="text-xs text-gray-400">{destination}</h4>
                    </div>
                </div>
                <div className="w-5/6 mt-20">
                    <h1 className="text-center text-xl">About Flight</h1>
                    <h3 className="tracking-wide text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam molestias optio suscipit nihil ab eius ullam repellendus nobis natus voluptatum explicabo, eligendi mollitia obcaecati maxime at consequuntur error architecto totam qui assumenda numquam! Error officia voluptate assumenda nobis minima quae veniam animi, id nisi magni eum, autem recusandae iste quos enim neque praesentium quidem corporis aliquid quaerat odit. Culpa eos dolor, rem magnam nobis adipisci tempore obcaecati, commodi vero consectetur, illum sed reprehenderit itaque rerum incidunt. Ut veniam fuga maiores, harum id eius totam rerum quam distinctio eos dicta asperiores quibusdam iusto, consequuntur, doloribus voluptatum. Corporis excepturi culpa debitis.</h3>
                </div>
                <div className="flex w-full max-h-screen justify-around mt-10">
                    <div className="w-3/12 shadow-3xl rounded-lg flex flex-col justify-center items-center p-5">
                        <h1 className="tracking-wide text-gray-400">Boeing 767</h1>
                        <img src="/src/images/boeing-img.png" className="w-40 h-20" />
                        <div className="flex flex-col w-full gap-5">
                            <div className="flex justify-between items-center ml-5 mr-5">
                                <h3>Age</h3>
                                <h3>6y 7m</h3>
                            </div>
                            <hr className="w-30 bg-slate-400"></hr>
                            <div className="flex justify-between items-center ml-5 mr-5">
                                <h3>Seats</h3>
                                <h3>648</h3>
                            </div>
                            <hr className="w-30 bg-slate-400"></hr>
                            <div className="flex justify-between items-center ml-5 mr-5">
                                <h3>Distance</h3>
                                <h3>9048km</h3>
                            </div>
                        </div>
                    </div>
                    <Tabs defaultValue="account" className="w-7/12 shadow-3xl rounded-lg">
                        <TabsList className="m-5">
                            <TabsTrigger value="account">Weather Updates</TabsTrigger>
                            <TabsTrigger value="password">Aircraft Status</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="m-5">
                            <div className="flex flex-col">
                                <h3>General Conditions</h3>
                                <div className="flex gap-10">
                                    <div className="flex mt-4 ml-4 items-center gap-2">
                                        <FiWind />
                                        <h6 className="text-xs">Wind Speed</h6>
                                        <Badge variant="outline">{Math.floor(flightData?.flightData?.weatherInfo.current.windSpeed10m)}Km/hr</Badge>
                                    </div>
                                    <div className="flex mt-4 ml-4 items-center gap-2">
                                        <MdVisibility />
                                        <h6 className="text-xs">Visibility</h6>
                                        <Badge variant="outline">{Math.floor(flightData?.flightData?.weatherInfo.current.cloudCover)}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-5">
                                <h3>Specific Conditions</h3>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <FaRegSnowflake />
                                        <h6 className="text-xs">Snow</h6>
                                    </div>
                                    <Badge variant="outline">0</Badge>
                                </div>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <FaCloudRain />
                                        <h6 className="text-xs">Rain</h6>
                                    </div>
                                    <Badge variant="outline">{Math.floor(flightData?.flightData?.weatherInfo.current.rain)}</Badge>
                                </div>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <BsCloudFogFill />
                                        <h6 className="text-xs">Fog</h6>
                                    </div>
                                    <Badge variant="outline">100</Badge>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password" className="m-5">
                            <div className="flex flex-col">
                                <h3>Intermediate Emergency</h3>
                                <div className="flex gap-10">
                                    <div className="flex mt-4 ml-4 items-center gap-2">
                                        <RiGpsFill />
                                        <h6 className="text-xs">GPS Signals</h6>
                                        <Badge variant="outline">Medium</Badge>
                                    </div>
                                    <div className="flex mt-4 ml-4 items-center gap-2">
                                        <MdOutlineNoiseControlOff />
                                        <h6 className="text-xs">Noise</h6>
                                        <Badge variant="outline">200 dB</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-5">
                                <h3>High Emergency</h3>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <FcElectronics />
                                        <h6 className="text-xs">Electronic Failure</h6>
                                    </div>
                                    <Badge variant="outline">{(flightData?.flightData?.riskAssessment.electronicFailure) ? 'low' : 'high'}</Badge>
                                </div>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <MdFlightLand />
                                        <h6 className="text-xs">Damage Part</h6>
                                    </div>
                                    <Badge variant="outline">NO</Badge>
                                </div>
                                <div className="flex mt-4 ml-4 items-center gap-10">
                                    <div className="flex gap-2">
                                        <BsFillFuelPumpFill />
                                        <h6 className="text-xs">Fuel</h6>
                                    </div>
                                    <Badge variant="outline">Less</Badge>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <div className="mt-20">
                { <button onClick={() => handleRoute(flightData?.flightData?.flight.id)}> check Route</button>}
            </div>
        </div>


    );
};

export default FlightInfo;


