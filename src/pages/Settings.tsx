
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SettingsManager from '../components/settings/SettingsManager';

const Settings = () => {
  return (
    <DashboardLayout>
      <SettingsManager />
    </DashboardLayout>
  );
};

export default Settings;
