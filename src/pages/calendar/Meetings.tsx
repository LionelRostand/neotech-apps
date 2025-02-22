
import React from 'react';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Meetings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Réunions Vidéo</h2>
        </div>
        <Button>
          <Video className="h-4 w-4 mr-2" />
          Nouvelle réunion
        </Button>
      </div>
      
      <div className="rounded-md border p-6">
        <p className="text-muted-foreground text-center">Aucune réunion planifiée.</p>
      </div>
    </div>
  );
};

export default Meetings;
