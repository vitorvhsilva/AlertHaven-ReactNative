import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CircleData {
  center: LatLngExpression;
  radius: number;
  color?: string;
  fillColor?: string;
  popupText?: string;
}

interface MarkerData {
  position: LatLngExpression;
  type: MarkerType;
  popupText?: string;
}

interface WebMapProps {
  center: LatLngExpression;
  zoom?: number;
  circles?: CircleData[];
  markers?: MarkerData[];
  userLocation?: LatLngExpression | null;
}

export type MarkerType = 
  | 'ALAGAMENTO' 
  | 'TEMPESTADE' 
  | 'TORNADO' 
  | 'ONDA_DE_CALOR' 
  | 'TERREMOTO' 
  | 'USUARIO'
  | 'ABRIGO';

const ICON_URLS = {
  ALAGAMENTO: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/alagamento.png',
  TEMPESTADE: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/chuva.png',
  TORNADO: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/tornado.png',
  ONDA_DE_CALOR: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/onda_calor.png',
  TERREMOTO: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/terremoto.png',
  USUARIO: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/usuario.png',
  ABRIGO: 'https://raw.githubusercontent.com/vitorvhsilva/AlertHaven-ReactNative/main/AlertHaven/assets/icons/abrigo.png'
};

const WebMap: React.FC<WebMapProps> = ({ 
  center = [-23.5505, -46.6333], 
  zoom = 15, 
  circles = [], 
  markers = [],
  userLocation = null
}) => {
  useEffect(() => {
    const map = L.map('map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Corrige o problema do ícone padrão do Leaflet
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const createCustomIcon = (type: MarkerType) => {
      const iconSize: [number, number] = type === 'USUARIO' ? [32, 32] : [40, 40];
      
      return L.icon({
        iconUrl: ICON_URLS[type],
        iconSize: iconSize,
        iconAnchor: [iconSize[0]/2, iconSize[1]],
        popupAnchor: [0, -iconSize[1]/2]
      });
    };

    markers.forEach(marker => {
      L.marker(marker.position, { 
        icon: createCustomIcon(marker.type),
        zIndexOffset: marker.type === 'USUARIO' ? 1000 : 0
      })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center;">
          <strong>${marker.type.replace('_', ' ')}</strong><br/>
          ${marker.popupText || ''}
        </div>
      `);
    });

    if (userLocation) {
      L.marker(userLocation, { 
        icon: createCustomIcon('USUARIO'),
        zIndexOffset: 1000
      })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center;">
          <strong>SUA LOCALIZAÇÃO</strong><br/>
          Você está aqui
        </div>
      `);
    }

    circles.forEach(circle => {
      L.circle(circle.center, {
        radius: circle.radius,
        color: circle.color || '#3388ff',
        fillColor: circle.fillColor || '#3388ff',
        fillOpacity: 0.2
      })
      .addTo(map)
      .bindPopup(circle.popupText || "");
    });

    return () => {
      map.remove();
    };
  }, [center, zoom, circles, markers, userLocation]);

  return <div id="map" style={{ width: '100%', height: '60vh', borderRadius: '20px' }} />;
};

export default WebMap;