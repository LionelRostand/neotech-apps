
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const Calendar = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Calendrier</h1>
      <Card className="p-6">
        <Outlet />
      </Card>
    </div>
  );
};

export default Calendar;
