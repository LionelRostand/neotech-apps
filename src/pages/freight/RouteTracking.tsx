
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Truck } from 'lucide-react';

const RouteTracking = () => {
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

      <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Carte interactive en cours de développement</p>
      </div>
    </div>
  );
};

export default RouteTracking;
