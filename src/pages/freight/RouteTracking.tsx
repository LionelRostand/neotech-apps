
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const RouteTracking = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapInitialized) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.333333, 48.866667], // Paris coordinates
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add a marker for demonstration
      new mapboxgl.Marker()
        .setLngLat([2.333333, 48.866667])
        .addTo(map.current);

      setMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, mapInitialized]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Itinéraires & Suivi</h1>
        <p className="text-gray-500">Planifiez et suivez les trajets en temps réel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Véhicules en route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">12</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Points de livraison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">48</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Temps moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">2h15</span>
          </CardContent>
        </Card>
      </div>

      {!mapboxToken && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Veuillez entrer votre token Mapbox public pour afficher la carte. 
            Vous pouvez obtenir un token sur https://mapbox.com/
          </p>
          <Input
            type="text"
            placeholder="Entrez votre token Mapbox public"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="max-w-md"
          />
        </div>
      )}

      <div 
        ref={mapContainer} 
        className="h-[400px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default RouteTracking;
