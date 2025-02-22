
import React from 'react';
import { Mail, Check, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const EmailNotifications = () => {
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  const handleToggleEmail = (checked: boolean) => {
    setEmailEnabled(checked);
    if (checked) {
      toast({
        title: "Notifications par email activées",
        description: "Vous recevrez désormais les notifications par email",
      });
    } else {
      toast({
        title: "Notifications par email désactivées",
        description: "Vous ne recevrez plus de notifications par email",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neotech-50 rounded-lg">
            <Mail className="w-5 h-5 text-neotech-500" />
          </div>
          <div>
            <h3 className="font-medium">Notifications par email</h3>
            <p className="text-sm text-gray-500">Recevez les notifications importantes par email</p>
          </div>
        </div>
        <Switch
          checked={emailEnabled}
          onCheckedChange={handleToggleEmail}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Configuration des notifications</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Rappels de réunions</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Nouveaux messages</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Mises à jour importantes</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNotifications;
