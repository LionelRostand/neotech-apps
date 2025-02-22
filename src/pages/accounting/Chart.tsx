
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Account {
  id: string;
  number: string;
  name: string;
  type: string;
  balance: number;
}

// Exemple de comptes pour démonstration
const initialAccounts: Account[] = [
  { id: '1', number: '411', name: 'Clients', type: 'Actif', balance: 0 },
  { id: '2', number: '401', name: 'Fournisseurs', type: 'Passif', balance: 0 },
  { id: '3', number: '512', name: 'Banque', type: 'Actif', balance: 0 },
  { id: '4', number: '607', name: 'Achats de marchandises', type: 'Charge', balance: 0 },
  { id: '5', number: '707', name: 'Ventes de marchandises', type: 'Produit', balance: 0 },
];

const AccountingChart = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [newAccount, setNewAccount] = useState({ number: '', name: '', type: 'Actif' });
  const { toast } = useToast();

  const handleAddAccount = () => {
    if (!newAccount.number || !newAccount.name) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const account: Account = {
      id: Date.now().toString(),
      ...newAccount,
      balance: 0
    };

    setAccounts([...accounts, account]);
    setNewAccount({ number: '', name: '', type: 'Actif' });
    toast({
      title: "Compte ajouté",
      description: `Le compte ${account.number} a été ajouté avec succès`,
    });
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Compte supprimé",
      description: "Le compte a été supprimé avec succès",
    });
  };

  const accountTypes = ['Actif', 'Passif', 'Charge', 'Produit'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Plan Comptable</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Importer
        </Button>
      </div>

      <div className="grid gap-4 p-4 border rounded-lg bg-white">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label htmlFor="accountNumber">Numéro de compte</Label>
            <Input
              id="accountNumber"
              value={newAccount.number}
              onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
              placeholder="Ex: 411"
            />
          </div>
          <div>
            <Label htmlFor="accountName">Libellé</Label>
            <Input
              id="accountName"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              placeholder="Ex: Clients"
            />
          </div>
          <div>
            <Label htmlFor="accountType">Type</Label>
            <select
              id="accountType"
              className="w-full p-2 border rounded-md"
              value={newAccount.type}
              onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddAccount} className="w-full">
              Ajouter un compte
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Solde</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountingChart;

