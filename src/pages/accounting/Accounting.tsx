
import React from 'react';
import { Outlet } from 'react-router-dom';

const Accounting = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Accounting</h1>
      <Outlet />
    </div>
  );
};

export default Accounting;
