
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Mail,
  FileText,
  Check,
  X,
  Trash2,
} from 'lucide-react';
import type { Quote } from '../../../types/sales';

interface QuoteActionsProps {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
}

export const QuoteActions = ({ quote, onEdit, onDelete }: QuoteActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(quote)}>
          <Pencil className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
          <Eye className="h-4 w-4 mr-2" />
          Voir
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
          <Mail className="h-4 w-4 mr-2" />
          Envoyer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
          <FileText className="h-4 w-4 mr-2" />
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
          <Check className="h-4 w-4 mr-2" />
          Accepter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
          <X className="h-4 w-4 mr-2" />
          Rejeter
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => quote.id && onDelete(quote.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
