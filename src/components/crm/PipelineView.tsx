import { useState, useCallback, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Trash2, Building2, Calendar, Euro } from 'lucide-react';
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
  const [selectedClient, setSelectedClient] = useState('all');
  
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
    staleTime: 60000,
    gcTime: 300000,
  });

  const clients = useMemo(() => 
    [...new Set(opportunities.map(opp => opp.clientName))],
    [opportunities]
  );
  
  const filteredOpportunities = useMemo(() => 
    opportunities.filter(opp => {
      const meetsValueCriteria = opp.value >= minValue;
      const meetsClientCriteria = selectedClient === 'all' || opp.clientName === selectedClient;
      return meetsValueCriteria && meetsClientCriteria;
    }),
    [opportunities, minValue, selectedClient]
  );

  const handleDeleteOpportunity = useCallback(async (id: string) => {
    try {
      await deleteOpportunity(id);
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunité supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  }, [queryClient]);

  const handleDragStart = useCallback((e: React.DragEvent, opportunity: Opportunity) => {
    e.dataTransfer.setData('opportunityId', opportunity.id!);
    e.dataTransfer.effectAllowed = 'move';
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, stage: OpportunityStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverStage(stage);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraggedOverStage(null);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent, stage: OpportunityStage) => {
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
  }, [queryClient]);

  const calculateStageStats = useCallback((stage: OpportunityStage): StageStats => {
    const stageOpportunities = filteredOpportunities.filter((opp) => opp.stage === stage);
    return {
      count: stageOpportunities.length,
      total: stageOpportunities.reduce((sum, opp) => sum + opp.value, 0),
      opportunities: stageOpportunities,
    };
  }, [filteredOpportunities]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Pipeline Commercial</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Valeur totale : {filteredOpportunities
              .filter(opp => !['Perdu'].includes(opp.stage))
              .reduce((sum, opp) => sum + opp.value, 0)
              .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <OpportunityFormDialog />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-card rounded-lg p-4 shadow-sm">
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

      <div className="grid grid-cols-5 gap-6">
        {STAGES.map((stage) => {
          const stats = calculateStageStats(stage);
          return (
            <div
              key={stage}
              className={`space-y-4 min-h-[500px] ${
                draggedOverStage === stage ? 'bg-muted/50 rounded-lg p-2' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <Card className={`
                border-t-4 shadow-sm
                ${stage === 'Gagné' ? 'border-t-green-500' : 
                  stage === 'Perdu' ? 'border-t-red-500' : 
                  stage === 'Négociation' ? 'border-t-orange-500' : 
                  stage === 'Proposition' ? 'border-t-blue-500' : 
                  'border-t-purple-500'}
              `}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold">{stage}</CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">
                      {stats.count}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stats.total.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-3">
                {stats.opportunities
                  .sort((a, b) => b.value - a.value)
                  .map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className={`
                        cursor-move hover:shadow-md transition-all duration-200
                        ${draggedOverStage === stage ? 'opacity-50' : ''}
                      `}
                      draggable
                      onDragStart={(e) => handleDragStart(e, opportunity)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-sm font-medium">
                            {opportunity.title}
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      <CardContent className="p-4 pt-0 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4 mr-1" />
                          {opportunity.clientName}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm font-medium">
                            <Euro className="h-4 w-4 mr-1" />
                            {opportunity.value.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            })}
                          </div>
                          {opportunity.expectedCloseDate && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(opportunity.expectedCloseDate).toLocaleDateString('fr-FR')}
                            </div>
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
