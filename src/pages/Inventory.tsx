
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import InventoryManagement from '../components/inventory/InventoryManagement';

const Inventory = () => {
  return (
    <DashboardLayout>
      <InventoryManagement />
    </DashboardLayout>
  );
};

export default Inventory;
