
import React from 'react';
import { Outlet } from 'react-router-dom';

const Accounting = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Comptabilité</h1>
      <Outlet />
    </div>
  );
};

export default Accounting;
