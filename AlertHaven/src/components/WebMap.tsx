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

import alagamentoIcon from '../../assets/icons/alagamento.png';
import tempestadeIcon from '../../assets/icons/chuva.png';
import tornadoIcon from '../../assets/icons/tornado.png';
import calorIcon from '../../assets/icons/onda_calor.png';
import terremotoIcon from '../../assets/icons/terremoto.png';
import usuarioIcon from '../../assets/icons/usuario.png';
import abrigoIcon from '../../assets/icons/abrigo.png';

export type MarkerType = 
  | 'ALAGAMENTO' 
  | 'TEMPESTADE' 
  | 'TORNADO' 
  | 'ONDA_DE_CALOR' 
  | 'TERREMOTO' 
  | 'USUARIO'
  | 'ABRIGO';

const ICON_URLS = {
  ALAGAMENTO: alagamentoIcon,
  TEMPESTADE: tempestadeIcon,
  TORNADO: tornadoIcon,
  ONDA_DE_CALOR: calorIcon,
  TERREMOTO: terremotoIcon,
  USUARIO: usuarioIcon,
  ABRIGO: abrigoIcon
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

    const createCustomIcon = (type: MarkerType) => {
      const iconSize: L.PointTuple = type === 'USUARIO' ? [32, 32] : [40, 40];
      
      return L.icon({
        iconUrl: ICON_URLS[type],
        iconSize: iconSize,
        iconAnchor: [iconSize[0]/2, iconSize[1]] as L.PointTuple,
        popupAnchor: [0, -iconSize[1]/2] as L.PointTuple
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