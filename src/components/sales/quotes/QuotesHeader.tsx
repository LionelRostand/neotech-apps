
import { Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuotesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewQuote: () => void;
}

export const QuotesHeader = ({ searchTerm, onSearchChange, onNewQuote }: QuotesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un devis..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={onNewQuote}>
        <Plus className="h-4 w-4 mr-2" />
        Nouveau devis
      </Button>
    </div>
  );
};
