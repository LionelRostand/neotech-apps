
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const Events = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Mes Événements</h2>
      </div>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        
        <div className="space-y-4">
          <h3 className="font-medium">Événements du {date?.toLocaleDateString()}</h3>
          {/* Liste des événements à implémenter */}
          <p className="text-muted-foreground">Aucun événement prévu pour cette date.</p>
        </div>
      </div>
    </div>
  );
};

export default Events;
