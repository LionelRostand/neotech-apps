
import { Upload, Download, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SearchBar from './SearchBar';

interface ContractsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewContract: () => void;
}

const ContractsToolbar = ({ searchTerm, onSearchChange, onNewContract }: ContractsToolbarProps) => {
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Vérification de la taille du fichier (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Le fichier est trop volumineux (max 5MB)");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          // Ici vous pourriez ajouter la logique pour traiter le contenu du fichier
          console.log("Fichier importé:", file.name);
          toast.success(`Fichier ${file.name} importé avec succès`);
        };
        reader.onerror = () => {
          toast.error("Erreur lors de la lecture du fichier");
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  const handleExport = () => {
    // Exemple de données à exporter (à remplacer par vos données réelles)
    const data = [
      ['Référence', 'Titre', 'Client', 'Statut', 'Date début', 'Date fin', 'Valeur'],
      ['CONT-2024-001', 'Contrat exemple', 'Client A', 'En cours', '2024-01-01', '2024-12-31', '50000']
    ];

    // Création du contenu CSV
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Création du lien de téléchargement
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contrats_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    // Déclencher le téléchargement
    link.click();
    
    // Nettoyage
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Export des contrats réussi");
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 flex-1">
        <SearchBar searchTerm={searchTerm} onChange={onSearchChange} />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleImport}>
          <Upload className="h-4 w-4 mr-2" />
          Importer
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button size="sm" onClick={onNewContract}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contrat
        </Button>
      </div>
    </div>
  );
};

export default ContractsToolbar;
