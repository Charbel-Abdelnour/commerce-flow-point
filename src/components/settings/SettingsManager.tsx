
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import GeneralSettings from './sections/GeneralSettings';
import UserSettings from './sections/UserSettings';
import PaymentSettings from './sections/PaymentSettings';
import ReceiptSettings from './sections/ReceiptSettings';
import TaxSettings from './sections/TaxSettings';
import IntegrationSettings from './sections/IntegrationSettings';
import ProductSettings from './sections/ProductSettings';
import ProfileSettings from './sections/ProfileSettings';

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Settings</h1>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="receipt">Receipt</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <GeneralSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UserSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <ProductSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <PaymentSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="receipt" className="space-y-4">
          <ReceiptSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4">
          <TaxSettings onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <IntegrationSettings onSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
