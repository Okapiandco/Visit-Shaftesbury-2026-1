import React, { useEffect, useRef, useState } from 'react';

interface EventMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

const EventMap: React.FC<EventMapProps> = ({ lat, lng, locationName }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!(window as any).L) {
      setError("Map library failed to load.");
      return;
    }

    const L = (window as any).L;

    if (!mapInstanceRef.current && mapContainerRef.current) {
      try {
        const position: [number, number] = [lat, lng];
        
        const map = L.map(mapContainerRef.current, {
          center: position,
          zoom: 17,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        const eventIcon = L.divIcon({
          className: 'custom-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker(position, { icon: eventIcon })
          .addTo(map)
          .bindPopup(`<strong style="color: #013220;">${locationName}</strong>`)
          .openPopup();

        // User Geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (userPos) => {
              const userLatLng: [number, number] = [userPos.coords.latitude, userPos.coords.longitude];
              const userIcon = L.divIcon({
                className: 'user-marker',
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              });
              L.marker(userLatLng, { icon: userIcon }).addTo(map).bindPopup("You are here");
            },
            () => console.debug("Geolocation denied or failed")
          );
        }

        mapInstanceRef.current = map;
      } catch (e) {
        setError("Failed to initialize the map.");
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, locationName]);

  if (error) {
    return (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-heritage-cream border border-heritage-gold/20 p-8 text-center rounded-sm">
        <h3 className="font-serif font-bold text-heritage-green mb-2 text-sm">Map Unavailable</h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[300px] rounded-sm shadow-inner z-10"
      aria-label={`Map showing location of ${locationName}`}
    />
  );
};

export default EventMap;