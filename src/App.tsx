import './App.css'
import ClippedMap from './components/ClippedMap'
import FlightInfo from './components/FlightInfo'
// import FlightMap from './components/FlightMap'
function App() {
  /**
   * TODO: Implement the following:
   * - Create routing (use react-router-dom)
   * - Create pages folder and add the pages there
   * - Use Components folder to add reusable components
   */

  return (
    <main>
      <div className="w-screen min-h-screen">
        <FlightInfo/>
        {/* <FlightMap /> */}
        <ClippedMap/>
      </div>
    </main>
  )
}

export default App
// frontend/src/App.tsx

// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('https://23da-2405-201-8010-d179-6c4e-135a-f6fa-db43.ngrok-free.app');

// interface FlightDetails {
//     flightNumber: string;
//     status: string;
//     departure: string;
//     arrival: string;
// }

// const App: React.FC = () => {
//     const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);

//     useEffect(() => {
//         socket.on('connect', () => {
//             console.log('Connected to Socket.IO server');
//         });

//         socket.on('flightDetails', (details: FlightDetails) => {
//             console.log('Received flight details:', details);
//             setFlightDetails(details);
//         });

//         socket.on('message', (message: string) => {
//             console.log('Received message:', message);
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from Socket.IO server');
//         });

//         return () => {
//             socket.off('flightDetails');
//             socket.off('message');
//             socket.off('disconnect');
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Real-Time Flight Details</h1>
//             {flightDetails ? (
//                 <div>
//                     <p>Flight Number: {flightDetails.flightNumber}</p>
//                     <p>Status: {flightDetails.status}</p>
//                     <p>Departure: {flightDetails.departure}</p>
//                     <p>Arrival: {flightDetails.arrival}</p>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default App;