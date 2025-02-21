
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-