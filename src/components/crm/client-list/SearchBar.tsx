
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative flex-1 max-w-sm">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
    <Input
      placeholder="Rechercher un client..."
      className="pl-8"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

