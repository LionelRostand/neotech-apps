
import React from 'react';
import { BellRing } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BellRing className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="space-y-1">
            <p className="font-medium">Notifications par email</p>
            <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="space-y-1">
            <p className="font-medium">Notifications push</p>
            <p className="text-sm text-muted-foreground">Recevoir les notifications dans le navigateur</p>
          </div>
          <Switch />
        </div>

        <div className="border rounded-md">
          <h3 className="font-medium p-4 border-b">Historique des notifications</h3>
          <ScrollArea className="h-[400px] p-4">
            <p className="text-muted-foreground text-center">Aucune notification.</p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
