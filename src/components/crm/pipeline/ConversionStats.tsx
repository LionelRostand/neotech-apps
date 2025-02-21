
import { Card } from "@/components/ui/card";
import { Opportunity } from "../../../types/crm";
import { ChevronRight } from "lucide-react";

interface ConversionStatsProps {
  opportunities: Opportunity[];
}

const ConversionStats = ({ opportunities }: ConversionStatsProps) => {
  const calculateConversionRate = (fromStage: string, toStage: string) => {
    const fromCount = opportunities.filter(opp => opp.stage === fromStage).length;
    const toCount = opportunities.filter(opp => opp.stage === toStage).length;
    return fromCount > 0 ? Math.round((toCount / fromCount) * 100) : 0;
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Taux de conversion</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Qualification <ChevronRight className="inline h-4 w-4" /> Proposition</span>
          <span className="font-medium">{calculateConversionRate('Qualification', 'Proposition')}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Proposition <ChevronRight className="inline h-4 w-4" /> Négociation</span>
          <span className="font-medium">{calculateConversionRate('Proposition', 'Négociation')}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Négociation <ChevronRight className="inline h-4 w-4" /> Gagné</span>
          <span className="font-medium">{calculateConversionRate('Négociation', 'Gagné')}%</span>
        </div>
      </div>
    </Card>
  );
};

export default ConversionStats;
