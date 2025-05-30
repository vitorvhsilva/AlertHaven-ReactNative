// components/WebMap.tsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WebMap = () => {
  useEffect(() => {
    // Inicializa o mapa apenas no navegador
    const map = L.map('map').setView([-23.5505, -46.6333], 13);

    // Adiciona o tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona um marcador
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.marker([-23.5505, -46.6333], { icon })
      .addTo(map)
      .bindPopup('Olá, Leaflet no React Native Web!');

    return () => {
      map.remove(); // Limpa o mapa ao desmontar o componente
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default WebMap;