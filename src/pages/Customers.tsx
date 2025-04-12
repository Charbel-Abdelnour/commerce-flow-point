
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CustomerManagement from '../components/customers/CustomerManagement';

const Customers = () => {
  return (
    <DashboardLayout>
      <CustomerManagement />
    </DashboardLayout>
  );
};

export default Customers;
