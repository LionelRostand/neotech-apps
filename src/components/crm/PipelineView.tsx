
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  client: string;
  value: number;
  stage: string;
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Projet de développement web',
    client: 'Tech Solutions',
    value: 15000,
    stage: 'Qualification',
  },
  {
    id: '2',
    title: 'Refonte application mobile',
    client: 'Digital Agency',
    value: 25000,
    stage: 'Proposition',
  },
];

const STAGES = [
  'Qualification',
  'Proposition',
  'Négociation',
  'Gagné',
  'Perdu',
];

const PipelineView = () => {
  const [opportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pipeline Commercial</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvelle opportunité
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {STAGES.map((stage) => (
          <div key={stage} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{stage}</h3>
              <span className="text-sm text-gray-500">
                {opportunities.filter((opp) => opp.stage === stage).length}
              </span>
            </div>
            <div className="space-y-2">
              {opportunities
                .filter((opp) => opp.stage === stage)
                .map((opportunity) => (
                  <Card key={opportunity.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">
                        {opportunity.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">{opportunity.client}</p>
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
