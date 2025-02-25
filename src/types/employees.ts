
export interface Employee {
  id: string;
  firstName: string;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
  startDate: string;
  birthDate: string;
  address: string;
  city: string;
  contractType: 'CDI' | 'CDD';
  companyId: string;
  managerId: string;
}
