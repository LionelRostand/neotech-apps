
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scan, Package } from 'lucide-react';
import { toast } from 'sonner';

const ParcelScanning = () => {
  const [code, setCode] = useState('');

  const handleScan = () => {
    if (code.trim()) {
      // Ici, nous simulerons une recherche de colis
      // Dans une version réelle, cela ferait appel à une API
      toast.success("Code scanné avec succès: " + code);
    } else {
      toast.error("Veuillez entrer un code valide");
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
              <Button onClick={handleScan}>
                Scanner
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
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Aucun scan récent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Informations du Colis</h2>
        <p className="text-gray-500">
          Scannez un code pour voir les détails du colis
        </p>
      </div>
    </div>
  );
};

export default ParcelScanning;
