
import React from 'react';
import { Employee } from '@/types/employees';

interface OrgChartProps {
  employees: Employee[];
}

interface EmployeeNode extends Employee {
  subordinates: EmployeeNode[];
}

const OrganizationChart = ({ employees }: OrgChartProps) => {
  const buildHierarchy = (employeesList: Employee[]): EmployeeNode[] => {
    const employeeMap = new Map<string, EmployeeNode>();
    
    // Convertir tous les employés en nœuds
    employeesList.forEach(emp => {
      employeeMap.set(emp.id, { ...emp, subordinates: [] });
    });

    const rootNodes: EmployeeNode[] = [];

    // Construire l'arborescence
    employeesList.forEach(emp => {
      const node = employeeMap.get(emp.id);
      if (node) {
        if (emp.managerId && employeeMap.has(emp.managerId)) {
          const manager = employeeMap.get(emp.managerId);
          if (manager) {
            manager.subordinates.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      }
    });

    return rootNodes;
  };

  const renderEmployee = (node: EmployeeNode) => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
          <div className="text-center">
            <div className="font-medium text-gray-900">{node.firstName} {node.name}</div>
            <div className="text-sm text-gray-500">{node.position}</div>
          </div>
        </div>
        {node.subordinates.length > 0 && (
          <div className="relative pt-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-300"></div>
            <div className="flex gap-8">
              {node.subordinates.map(sub => renderEmployee(sub))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hierarchy = buildHierarchy(employees);

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Organigramme</h2>
      <div className="flex justify-center min-w-full">
        {hierarchy.map(node => renderEmployee(node))}
      </div>
    </div>
  );
};

export default OrganizationChart;
