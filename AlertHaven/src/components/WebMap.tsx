import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WebMap = () => {
  useEffect(() => {
    const center: LatLngExpression = [-23.5505, -46.6333];

    const map = L.map('map').setView(center, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.marker(center, {icon})
      .addTo(map)
      .bindPopup("Centro do círculo");
    
    L.circle(center, {
      radius: 300, 
      color: '#3388ff', 
      fillColor: '#3388ff', 
      fillOpacity: 0.2 
    }).addTo(map);

  }, []);

  return <div id="map" style={{ width: '100%', height: '60vh', borderRadius: '20px' }} />;
};

export default WebMap;