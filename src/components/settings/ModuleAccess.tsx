
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { usePermissions } from '@/hooks/usePermissions';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface ModulePermission {
  active: boolean;
  read: boolean;
  write: boolean;
  manage: boolean;
}

interface ModulePermissions {
  [key: string]: ModulePermission;
}

export const ModuleAccess = () => {
  const { role } = usePermissions();
  const [permissions, setPermissions] = useState<ModulePermissions>({
    crm: { active: true, read: true, write: true, manage: false },
    sales: { active: true, read: true, write: true, manage: false },
    purchases: { active: true, read: true, write: true, manage: false },
    freight: { active: true, read: true, write: true, manage: false },
    employees: { active: true, read: true, write: true, manage: false },
    accounting: { active: true, read: true, write: true, manage: false },
  });

  useEffect(() => {
    const fetchModulePermissions = async () => {
      try {
        const modulePermissionsRef = doc(db, 'settings', 'modulePermissions');
        const docSnap = await getDoc(modulePermissionsRef);
        
        if (docSnap.exists()) {
          setPermissions(docSnap.data() as ModulePermissions);
        } else {
          // Si aucune configuration n'existe, on crée la configuration par défaut
          await setDoc(modulePermissionsRef, permissions);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des permissions:', error);
        toast.error('Erreur lors de la récupération des permissions des modules');
      }
    };

    fetchModulePermissions();
  }, []);

  const handlePermissionChange = async (
    module: string,
    type: 'active' | 'read' | 'write' | 'manage',
    checked: boolean
  ) => {
    try {
      const newPermissions = {
        ...permissions,
        [module]: {
          ...permissions[module],
          [type]: checked,
        },
      };

      // Si le module est désactivé, on désactive toutes les permissions
      if (type === 'active' && !checked) {
        newPermissions[module] = {
          active: false,
          read: false,
          write: false,
          manage: false,
        };
      }

      // Mettre à jour le state local
      setPermissions(newPermissions);

      // Sauvegarder dans Firestore
      const modulePermissionsRef = doc(db, 'settings', 'modulePermissions');
      await setDoc(modulePermissionsRef, newPermissions);

      toast.success('Permissions mises à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des permissions:', error);
      toast.error('Erreur lors de la mise à jour des permissions');
    }
  };

  if (role !== 'admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des droits d'accès aux modules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(permissions).map(([moduleName, modulePerms]) => (
          <div key={moduleName} className="space-y-4 border-b pb-4 last:border-0">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${moduleName}-active`}
                checked={modulePerms.active}
                onCheckedChange={(checked) => 
                  handlePermissionChange(moduleName, 'active', checked as boolean)
                }
              />
              <Label htmlFor={`${moduleName}-active`} className="font-semibold capitalize">
                {moduleName}
              </Label>
            </div>
            
            {modulePerms.active && (
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${moduleName}-read`}
                    checked={modulePerms.read}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(moduleName, 'read', checked as boolean)
                    }
                  />
                  <Label htmlFor={`${moduleName}-read`}>Lecture</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${moduleName}-write`}
                    checked={modulePerms.write}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(moduleName, 'write', checked as boolean)
                    }
                  />
                  <Label htmlFor={`${moduleName}-write`}>Écriture</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${moduleName}-manage`}
                    checked={modulePerms.manage}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(moduleName, 'manage', checked as boolean)
                    }
                  />
                  <Label htmlFor={`${moduleName}-manage`}>Gestion</Label>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
