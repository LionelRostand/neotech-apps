
export type UserRole = 'admin' | 'manager' | 'accountant' | 'user';

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'manage')[];
}

export interface UserPermissions {
  role: UserRole;
  permissions: Permission[];
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
