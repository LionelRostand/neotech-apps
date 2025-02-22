
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ClientTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Entreprise</TableHead>
      <TableHead>Contact principal</TableHead>
      <TableHead>Statut</TableHead>
      <TableHead>Priorité</TableHead>
      <TableHead>Segment</TableHead>
      <TableHead>Actions rapides</TableHead>
      <TableHead className="w-[50px]"></TableHead>
    </TableRow>
  </TableHeader>
);

