
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Eye, 
  Trash2,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import type { Client } from '../../../types/crm';
import { ClientFormDialog } from '../ClientForm';

interface ClientTableRowProps {
  client: Client;
  onDelete: (id: string) => void;
  onView: (client: Client) => void;
}

export const ClientTableRow = ({ client, onDelete, onView }: ClientTableRowProps) => {
  const getPriorityBadge = (priority: string) => {
    const colors = {
      'Haute': 'bg-red-100 text-red-800',
      'Moyenne': 'bg-yellow-100 text-yellow-800',
      'Basse': 'bg-green-100 text-green-800'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Actif': 'bg-green-100 text-green-800',
      'Prospect': 'bg-blue-100 text-blue-800',
      'Inactif': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  return (
    <TableRow>
      <TableCell>
        <div>
          <p className="font-medium">{client.company}</p>
          <p className="text-sm text-gray-500">{client.name}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <p>{client.email}</p>
          <p className="text-sm text-gray-500">{client.phone}</p>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(client.status)}</TableCell>
      <TableCell>{getPriorityBadge(client.priority)}</TableCell>
      <TableCell>{client.segment}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(client)}>
              <Eye className="h-4 w-4 mr-2" />
              Voir détails
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClientFormDialog client={client} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(client.id!)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

