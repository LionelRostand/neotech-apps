
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scan, Package, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { scanParcel, type ParcelData } from '@/services/freightService';
import { format } from 'date-fns';

const ParcelScanning = () => {
  const [code, setCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [currentParcel, setCurrentParcel] = useState<ParcelData | null>(null);

  const handleScan = async () => {
    if (!code.trim()) {
      toast.error("Veuillez entrer un code valide");
      return;
    }

    setScanning(true);
    try {
      const parcel = await scanParcel(code);
      if (parcel) {
        setCurrentParcel(parcel);
        setCode('');
      }
    } catch (error) {
      toast.error("Erreur lors du scan du colis");
      console.error(error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scanner un Colis</h1>
        <p className="text-gray-500">Scannez ou entrez manuellement le code CR pour suivre un colis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5" />
              Scanner un Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input 
                type="text"
                placeholder="Entrez le code CR"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleScan} disabled={scanning}>
                {scanning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Scanner'
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Entrez le code manuellement ou utilisez un scanner CR-CODE
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Derniers Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentParcel ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Code: {currentParcel.trackingNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Scanné le: {format(currentParcel.updatedAt, 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Aucun scan récent</p>
            )}
          </CardContent>
        </Card>
      </div>

      {currentParcel && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informations du Colis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Numéro de suivi</p>
              <p className="text-lg">{currentParcel.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Statut</p>
              <p className="text-lg capitalize">{currentParcel.status.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Origine</p>
              <p className="text-lg">{currentParcel.origin}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Destination</p>
              <p className="text-lg">{currentParcel.destination}</p>
            </div>
            {currentParcel.clientId && (
              <div>
                <p className="text-sm font-medium text-gray-600">Client ID</p>
                <p className="text-lg">{currentParcel.clientId}</p>
              </div>
            )}
            {currentParcel.purchaseOrderId && (
              <div>
                <p className="text-sm font-medium text-gray-600">Bon de commande</p>
                <p className="text-lg">{currentParcel.purchaseOrderId}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelScanning;
