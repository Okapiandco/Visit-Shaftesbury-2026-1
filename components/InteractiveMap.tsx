import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LANDMARKS } from '../constants';

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    try {
      const center: L.LatLngExpression = [51.0044, -2.1979];

      // Initialize Map
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: 16,
        scrollWheelZoom: false,
      });

      // Use a clean, heritage-appropriate tile set (CartoDB Positron)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Add Landmark Markers
      LANDMARKS.forEach((landmark) => {
        if (landmark.lat && landmark.lng) {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          const marker = L.marker([landmark.lat, landmark.lng], { icon: customIcon }).addTo(map);

          const popupContent = `
            <div style="padding: 5px; font-family: 'Inter', sans-serif;">
              <h3 style="font-family: 'Playfair Display', serif; font-weight: bold; color: #013220; margin-bottom: 4px; font-size: 16px;">${landmark.name}</h3>
              <p style="font-size: 12px; color: #666; line-height: 1.4; margin: 0;">${landmark.description}</p>
            </div>
          `;

          marker.bindPopup(popupContent, {
            className: 'heritage-popup'
          });
        }
      });

      mapInstanceRef.current = map;

      // Invalidate size after a short delay to ensure proper rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

    } catch (e) {
      console.error("Map initialization failed", e);
      setError("Failed to initialize the interactive map.");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-heritage-cream border border-heritage-gold/20 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-heritage-green mb-2">Map Loading Issue</h3>
        <p className="text-sm text-gray-600 max-w-xs mx-auto">{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[400px] rounded-sm shadow-inner z-10"
      aria-label="Interactive map of Shaftesbury landmarks"
    />
  );
};

export default InteractiveMap;