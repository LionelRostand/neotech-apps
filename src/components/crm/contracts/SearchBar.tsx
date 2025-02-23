
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Rechercher un contrat..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
