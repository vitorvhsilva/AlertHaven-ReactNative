import React, { useEffect, useRef } from 'react';
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
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && containerRef.current) {
      const container = containerRef.current;
      
      if (container._leaflet_map) {
        try {
          container._leaflet_map.remove();
        } catch (e) {
          console.warn('Failed to clean up existing map:', e);
        }
      }

      const map = L.map(container, {
        preferCanvas: true,
        zoomControl: false,
        renderer: L.canvas()
      }).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      layersRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      initializedRef.current = true;

      console.log('Map initialized');
    }

    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }

    return () => {
      console.log('Cleaning up map');
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          console.log('Map removed successfully');
        } catch (e) {
          console.warn('Error removing map:', e);
        } finally {
          mapRef.current = null;
          initializedRef.current = false;
        }
      }
      if (layersRef.current) {
        layersRef.current.clearLayers();
        layersRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;

    const layers = layersRef.current;
    layers.clearLayers();

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
      .addTo(layers)
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
      .addTo(layers)
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
      .addTo(layers)
      .bindPopup(circle.popupText || "");
    });

    return () => {
      layers.clearLayers();
    };
  }, [circles, markers, userLocation]);

  return (
    <div 
      id="map" 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '60vh', 
        borderRadius: '20px',
        zIndex: 0,
        position: 'relative'
      }} 
    />
  );
};

export default WebMap;