
export type UserRole = 'admin' | 'manager' | 'accountant' | 'user';

export interface Company {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'manage')[];
}

export interface UserPermissions {
  role: UserRole;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

export const defaultPermissions: Record<UserRole, Permission[]> = {
  admin: [
    { module: '*', actions: ['read', 'write', 'delete', 'manage'] }
  ],
  manager: [
    { module: 'accounting', actions: ['read', 'write', 'manage'] },
    { module: 'crm', actions: ['read', 'write', 'manage'] },
    { module: 'employees', actions: ['read', 'write'] }
  ],
  accountant: [
    { module: 'accounting', actions: ['read', 'write'] },
    { module: 'crm', actions: ['read'] }
  ],
  user: [
    { module: 'accounting', actions: ['read'] },
    { module: 'crm', actions: ['read'] }
  ]
};
