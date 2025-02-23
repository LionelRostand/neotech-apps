
import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';
import ProtectedRoute from '../auth/ProtectedRoute';
import { CompanyInformation } from './CompanyInformation';
import { RolesPermissions } from './RolesPermissions';
import { LocalizationSettings } from './LocalizationSettings';
import { ModuleAccess } from './ModuleAccess';
import { TimezoneSettings } from './TimezoneSettings';
import { CurrencySettings } from './CurrencySettings';

export const GeneralSettings = () => {
  const { role } = usePermissions();
  const { user } = useAuth();

  console.log('Current user:', user);
  console.log('Current role:', role);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // TODO: Handle form submission
      toast.success("Paramètres sauvegardés avec succès");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde des paramètres");
    }
  };

  if (!user || !role) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <p>Chargement des paramètres...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute module="settings" action="manage">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Paramètres généraux</h1>
            <p className="text-muted-foreground">
              {user.email === 'admin@neotech-consulting.com' 
                ? 'Configuration des paramètres généraux de l\'application.' 
                : 'Accès restreint aux administrateurs.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <CompanyInformation />
            <RolesPermissions role={role} />
            <LocalizationSettings />
            <ModuleAccess />
            <TimezoneSettings />
            <CurrencySettings />

            <div className="flex justify-end">
              <Button type="submit">
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default GeneralSettings;
