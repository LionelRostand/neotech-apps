
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
    // Ici, vous pourriez ajouter la logique d'import réelle
    toast.info("L'import des contrats sera bientôt disponible");
  };

  const handleExport = () => {
    // Ici, vous pourriez ajouter la logique d'export réelle
    toast.info("L'export des contrats sera bientôt disponible");
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
