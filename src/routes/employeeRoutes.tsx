
import EmployeeManagement from '@/pages/employees/Management';
import EmployeeContracts from '@/pages/employees/Contracts';
import EmployeeLeaves from '@/pages/employees/Leaves';
import EmployeeAttendance from '@/pages/employees/Attendance';
import EmployeePerformance from '@/pages/employees/Performance';
import EmployeePayroll from '@/pages/employees/Payroll';
import EmployeeReports from '@/pages/employees/Reports';
import Employees from '@/pages/Employees';

export const employeeRoutes = {
  path: "employees",
  element: <Employees />,
  children: [
    {
      index: true,
      element: <EmployeeManagement />
    },
    {
      path: "management",
      element: <EmployeeManagement />
    },
    {
      path: "contracts",
      element: <EmployeeContracts />
    },
    {
      path: "leaves",
      element: <EmployeeLeaves />
    },
    {
      path: "attendance",
      element: <EmployeeAttendance />
    },
    {
      path: "performance",
      element: <EmployeePerformance />
    },
    {
      path: "payroll",
      element: <EmployeePayroll />
    },
    {
      path: "reports",
      element: <EmployeeReports />
    }
  ]
};
