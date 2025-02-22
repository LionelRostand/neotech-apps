
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AccountingTax = () => {
  const { toast } = useToast();

  const handleGenerateDeclaration = () => {
    toast({
      title: "Génération de déclaration",
      description: "La génération de la déclaration fiscale a été initiée",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tax Management</h2>
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">VAT Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">TVA Collectée</p>
              <p className="text-2xl font-bold mt-1">€24,500.00</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">TVA Déductible</p>
              <p className="text-2xl font-bold mt-1">€18,750.00</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">TVA à payer</p>
              <p className="text-2xl font-bold mt-1 text-neotech-600">€5,750.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Tax Returns</h3>
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date limite</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q4 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TVA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      En attente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€5,750.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button 
                      onClick={handleGenerateDeclaration}
                      variant="outline"
                      size="sm"
                    >
                      Générer
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q3 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TVA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31/10/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Soumise
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€4,250.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button 
                      variant="outline"
                      size="sm"
                      disabled
                    >
                      Télécharger
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Autres Taxes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">CET (CFE + CVAE)</h4>
                <p className="text-sm text-gray-500">Contribution Économique Territoriale</p>
              </div>
              <Button 
                onClick={handleGenerateDeclaration}
                variant="outline"
              >
                Préparer la déclaration
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">IS</h4>
                <p className="text-sm text-gray-500">Impôt sur les Sociétés</p>
              </div>
              <Button 
                onClick={handleGenerateDeclaration}
                variant="outline"
              >
                Préparer la déclaration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingTax;
