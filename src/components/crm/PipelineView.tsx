
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Trash2 } from 'lucide-react';
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

const STAGES = [
  'Qualification',
  'Proposition',
  'Négociation',
  'Gagné',
  'Perdu',
] as const;

type OpportunityStage = typeof STAGES[number];

const PipelineView = () => {
  const queryClient = useQueryClient();
  const { data: opportunities = [], isLoading } = useQuery<Opportunity[]>({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
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
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, stage: OpportunityStage) => {
    e.preventDefault();
    const opportunityId = e.dataTransfer.getData('opportunityId');
    try {
      await updateOpportunity(opportunityId, { stage });
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Opportunité déplacée avec succès');
    } catch (error) {
      toast.error('Erreur lors du déplacement');
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pipeline Commercial</h2>
        <OpportunityFormDialog />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{stage}</h3>
              <span className="text-sm text-gray-500">
                {opportunities.filter((opp) => opp.stage === stage).length}
              </span>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {opportunities
                .filter((opp) => opp.stage === stage)
                .map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, opportunity)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
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
                      <p className="text-sm text-gray-500">{opportunity.clientName}</p>
                      <p className="text-sm font-medium mt-1">
                        {opportunity.value.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineView;
