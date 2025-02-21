
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOpportunities, deleteOpportunity, updateOpportunity } from '../../services';
import type { Opportunity } from '../../types/crm';
import { OpportunityFormDialog } from './OpportunityForm';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConversionStats from './pipeline/ConversionStats';
import PipelineFilters from './pipeline/PipelineFilters';

const STAGES = [
  'Qualification',
  'Proposition',
  'Négociation',
  'Gagné',
  'Perdu',
] as const;

type OpportunityStage = typeof STAGES[number];

interface StageStats {
  count: number;
  total: number;
  opportunities: Opportunity[];
}

const PipelineView = () => {
  const queryClient = useQueryClient();
  const [draggedOverStage, setDraggedOverStage] = useState<OpportunityStage | null>(null);
  const [minValue, setMinValue] = useState(0);
  const [selectedClient, setSelectedClient] = useState('');
  
  const { data: opportunities = [], isLoading } = useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  });

  const clients = [...new Set(opportunities.map(opp => opp.clientName))];
  
  const filteredOpportunities = opportunities.filter(opp => {
    const meetsValueCriteria = opp.value >= minValue;
    const meetsClientCriteria = !selectedClient || opp.clientName === selectedClient;
    return meetsValueCriteria && meetsClientCriteria;
  });

  const handleDeleteOpportunity = async (id: string) => {
    try {
      await deleteOpportunity(id);
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunité supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleDragStart = (e: React.DragEvent, opportunity: Opportunity) => {
    e.dataTransfer.setData('opportunityId', opportunity.id!);
    e.dataTransfer.effectAllowed = 'move';
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (e: React.DragEvent, stage: OpportunityStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverStage(stage);
  };

  const handleDragLeave = () => {
    setDraggedOverStage(null);
  };

  const handleDrop = async (e: React.DragEvent, stage: OpportunityStage) => {
    e.preventDefault();
    setDraggedOverStage(null);
    const opportunityId = e.dataTransfer.getData('opportunityId');
    try {
      await updateOpportunity(opportunityId, { stage });
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunité déplacée avec succès');
    } catch (error) {
      toast.error('Erreur lors du déplacement');
    }
  };

  const calculateStageStats = (stage: OpportunityStage): StageStats => {
    const stageOpportunities = filteredOpportunities.filter((opp) => opp.stage === stage);
    return {
      count: stageOpportunities.length,
      total: stageOpportunities.reduce((sum, opp) => sum + opp.value, 0),
      opportunities: stageOpportunities,
    };
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Pipeline Commercial</h2>
          <p className="text-sm text-muted-foreground">
            Valeur totale : {filteredOpportunities
              .filter(opp => !['Perdu'].includes(opp.stage))
              .reduce((sum, opp) => sum + opp.value, 0)
              .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <OpportunityFormDialog />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <PipelineFilters
            minValue={minValue}
            setMinValue={setMinValue}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            clients={clients}
          />
        </div>
        <div className="w-80">
          <ConversionStats opportunities={opportunities} />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {STAGES.map((stage) => {
          const stats = calculateStageStats(stage);
          return (
            <div
              key={stage}
              className={`space-y-4 min-h-[500px] ${
                draggedOverStage === stage ? 'bg-muted/50 rounded-lg' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="flex flex-col gap-1 bg-card p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{stage}</h3>
                  <span className="text-sm text-muted-foreground">
                    {stats.count} {stats.count > 1 ? 'opportunités' : 'opportunité'}
                  </span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stats.total.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </div>
              </div>

              <div className="space-y-2">
                {stats.opportunities
                  .sort((a, b) => b.value - a.value)
                  .map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className={`cursor-move hover:shadow-md transition-shadow ${
                        draggedOverStage === stage ? 'opacity-50' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, opportunity)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-sm font-medium">
                            {opportunity.title}
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <OpportunityFormDialog opportunity={opportunity} />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteOpportunity(opportunity.id!)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{opportunity.clientName}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-medium">
                            {opportunity.value.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            })}
                          </p>
                          {opportunity.expectedCloseDate && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(opportunity.expectedCloseDate).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineView;
