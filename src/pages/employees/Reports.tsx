
import { FileBarChart, BarChart, PieChart, LineChart, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmployeeReports = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileBarChart className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Rapports RH</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Effectifs par département
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart placeholder */}
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Effectifs par département
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribution des postes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart placeholder */}
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Distribution des postes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Évolution des effectifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart placeholder */}
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Évolution des effectifs
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter les rapports
        </Button>
      </div>
    </div>
  );
};

export default EmployeeReports;
