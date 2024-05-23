// src/icons/AirplaneIcon.ts
import L from 'leaflet';
import airplaneIconUrl from '/src/images/marker-icon.png'; // Ensure you have an airplane.png in your project

const AirplaneIcon = L.icon({
  iconUrl: airplaneIconUrl,
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 16], // Adjust anchor if necessary
});

export default AirplaneIcon;
