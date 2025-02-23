
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuoteTemplatePreview from './QuoteTemplatePreview';
import { Button } from "@/components/ui/button";
import { FileText, Eye } from 'lucide-react';

// Données de test - À remplacer par des données réelles
const mockTemplates = [
  {
    id: '1',
    name: 'Devis Standard',
    description: 'Modèle de devis classique pour les services généraux',
    content: `
      <div class="space-y-4">
        <div class="border-b pb-4">
          <h2 class="text-2xl font-bold">Devis N° [Numéro]</h2>
          <p class="text-muted-foreground">Date: [Date]</p>
        </div>
        <div class="space-y-2">
          <h3 class="font-semibold">Client</h3>
          <p>[Nom du client]<br/>[Adresse]</p>
        </div>
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 text-left">Description</th>
              <th class="py-2 text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-2">[Description du service]</td>
              <td class="py-2 text-right">[Montant] €</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="py-2 font-semibold">Total HT</td>
              <td class="py-2 text-right">[Total] €</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `
  },
  {
    id: '2',
    name: 'Devis Détaillé',
    description: 'Modèle de devis avec description détaillée des prestations',
    content: `
      <div class="space-y-6">
        <header class="border-b pb-4">
          <h2 class="text-2xl font-bold">Proposition Commerciale</h2>
          <p class="text-muted-foreground">Référence: [Ref]</p>
        </header>
        <section class="space-y-4">
          <h3 class="font-semibold">Détail des Prestations</h3>
          <div class="space-y-2">
            <div class="border p-4 rounded">
              <h4 class="font-medium">[Titre Prestation]</h4>
              <p class="text-sm text-muted-foreground">[Description détaillée]</p>
              <p class="text-right font-medium mt-2">[Prix] €</p>
            </div>
          </div>
        </section>
        <footer class="border-t pt-4">
          <p class="text-sm text-muted-foreground">Validité: 30 jours</p>
        </footer>
      </div>
    `
  }
];

const QuoteTemplatesList = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof mockTemplates[0] | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Modèles disponibles</h3>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Nouveau modèle
          </Button>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {mockTemplates.map((template) => (
              <Card
                key={template.id}
                className={`p-4 cursor-pointer transition-colors hover:border-primary ${
                  selectedTemplate?.id === template.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTemplate(template);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
      
      <div className="h-[500px] overflow-auto">
        <QuoteTemplatePreview template={selectedTemplate} />
      </div>
    </div>
  );
};

export default QuoteTemplatesList;
