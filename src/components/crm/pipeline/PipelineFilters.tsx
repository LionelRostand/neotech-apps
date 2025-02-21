
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PipelineFiltersProps {
  minValue: number;
  setMinValue: (value: number) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  clients: string[];
}

const PipelineFilters = ({
  minValue,
  setMinValue,
  selectedClient,
  setSelectedClient,
  clients,
}: PipelineFiltersProps) => {
  return (
    <div className="flex gap-4 items-end">
      <div className="space-y-2">
        <Label htmlFor="minValue">Montant minimum</Label>
        <Input
          id="minValue"
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          className="w-40"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="client">Client</Label>
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Tous les clients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les clients</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PipelineFilters;
