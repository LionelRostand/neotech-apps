
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import CompanyManagement from "../pages/companies/CompanyManagement";
import CompanyAssignments from "../pages/companies/CompanyAssignments";

export const companyRoutes: RouteObject = {
  path: "companies",
  children: [
    {
      index: true,
      element: <Navigate to="management" replace />
    },
    {
      path: "management",
      element: <CompanyManagement />
    },
    {
      path: "assignments",
      element: <CompanyAssignments />
    }
  ]
};
