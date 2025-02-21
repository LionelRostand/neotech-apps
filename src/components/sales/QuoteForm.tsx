
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from 'lucide-react';
import { Quote, QuoteItem } from '../../types/sales';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote?: Quote;
  onSubmit: (quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const QuoteFormDialog = ({ open, onOpenChange, quote, onSubmit }: QuoteFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [clientId, setClientId] = useState(quote?.clientId || '');
  const [clientName, setClientName] = useState(quote?.clientName || '');
  const [validUntil, setValidUntil] = useState(
    quote?.validUntil 
      ? new Date(quote.validUntil).toISOString().split('T')[0]
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState(quote?.notes || '');

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (quote) {
      setItems(quote.items);
      setClientId(quote.clientId);
      setClientName(quote.clientName);
      setValidUntil(new Date(quote.validUntil).toISOString().split('T')[0]);
      setNotes(quote.notes || '');
    } else {
      resetForm();
    }
  }, [quote]);

  const resetForm = () => {
    setItems([]);
    setClientId('');
    setClientName('');
    setValidUntil(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setNotes('');
  };

  const addItem = () => {
    setItems([...items, {
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0.2,
      total: 0
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
    const newItems = [...items];
    const item = newItems[index];
    
    if (field === 'productId' && value) {
      const product = products.find(p => p.id === value);
      if (product) {
        item.productId = product.id!;
        item.productName = product.name;
        item.unitPrice = product.price;
        item.taxRate = product.taxRate;
      }
    } else {
      (item as any)[field] = value;
    }

    // Recalculate total
    item.total = item.quantity * item.unitPrice * (1 + item.taxRate);
    
    setItems(newItems);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxTotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.taxRate), 0);
    const total = subtotal + taxTotal;
    return { subtotal, taxTotal, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Veuillez ajouter au moins un article");
      return;
    }

    try {
      setIsSubmitting(true);
      const { subtotal, taxTotal, total } = calculateTotals();
      
      await onSubmit({
        number: quote?.number || `D${Date.now()}`,
        clientId,
        clientName,
        status: quote?.status || 'draft',
        items,
        subtotal,
        taxTotal,
        total,
        validUntil: new Date(validUntil),
        notes,
        createdAt: quote?.createdAt || new Date(),
        updatedAt: new Date(),
      });

      onOpenChange(false);
      resetForm();
      toast.success(quote ? "Devis modifié avec succès" : "Devis créé avec succès");
    } catch (error) {
      console.error('Erreur lors de la soumission du devis:', error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{quote ? "Modifier le devis" : "Nouveau devis"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valide jusqu'au</Label>
              <Input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Articles</h3>
              <Button type="button" onClick={addItem} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un article
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg">
                <div className="col-span-4">
                  <Label>Produit</Label>
                  <Select
                    value={item.productId}
                    onValueChange={(value) => updateItem(index, 'productId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id!}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label>Quantité</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label>Prix unitaire</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label>TVA (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.taxRate * 100}
                    onChange={(e) => updateItem(index, 'taxRate', parseFloat(e.target.value) / 100)}
                  />
                </div>

                <div className="col-span-1">
                  <Label>Total</Label>
                  <div className="h-10 flex items-center">
                    {item.total.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </div>
                </div>

                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes ou commentaires sur le devis..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <div className="text-right space-y-1">
              <div className="text-sm text-muted-foreground">
                Sous-total: {calculateTotals().subtotal.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                Total TVA: {calculateTotals().taxTotal.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <div className="text-lg font-medium">
                Total: {calculateTotals().total.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : (quote ? "Modifier" : "Créer")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
