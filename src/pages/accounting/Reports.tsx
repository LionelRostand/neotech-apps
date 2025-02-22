
import React from 'react';
import { Card } from "@/components/ui/card";
import { FileBarChart, Download, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AccountingReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileBarChart className="w-6 h-6 text-gray-500" />
          <h2 className="text-2xl font-bold">Rapports Comptables</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Bilan Comptable</h3>
          <p className="text-gray-500 mb-4">État de la situation financière à une date donnée</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Compte de Résultat</h3>
          <p className="text-gray-500 mb-4">Performance financière sur une période donnée</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Grand Livre</h3>
          <p className="text-gray-500 mb-4">Détail des mouvements par compte</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Balance Âgée</h3>
          <p className="text-gray-500 mb-4">Analyse des créances et dettes par ancienneté</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Journal des Écritures</h3>
          <p className="text-gray-500 mb-4">Liste chronologique des opérations comptables</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">TVA</h3>
          <p className="text-gray-500 mb-4">État récapitulatif de la TVA</p>
          <Button variant="secondary" size="sm" className="w-full">
            Générer
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AccountingReports;

