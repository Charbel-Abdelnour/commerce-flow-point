
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from './sections/GeneralSettings';
import UserSettings from './sections/UserSettings';
import PaymentSettings from './sections/PaymentSettings';
import ReceiptSettings from './sections/ReceiptSettings';
import TaxSettings from './sections/TaxSettings';
import IntegrationSettings from './sections/IntegrationSettings';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = (section: string) => {
    // In a real app, this would save to backend/database
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your POS system settings and preferences.
          </p>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Tabs 
              defaultValue="general" 
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="flex border-b">
                <TabsList className="h-auto p-0 bg-transparent flex flex-nowrap overflow-x-auto">
                  <TabsTrigger 
                    value="general" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="users" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Users & Permissions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payment" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Payment Methods
                  </TabsTrigger>
                  <TabsTrigger 
                    value="receipts" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Receipts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tax" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Tax Settings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="integrations" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Integrations
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="general" className="mt-0 p-0">
                  <GeneralSettings onSave={() => handleSave("general")} />
                </TabsContent>
                <TabsContent value="users" className="mt-0 p-0">
                  <UserSettings onSave={() => handleSave("user")} />
                </TabsContent>
                <TabsContent value="payment" className="mt-0 p-0">
                  <PaymentSettings onSave={() => handleSave("payment")} />
                </TabsContent>
                <TabsContent value="receipts" className="mt-0 p-0">
                  <ReceiptSettings onSave={() => handleSave("receipt")} />
                </TabsContent>
                <TabsContent value="tax" className="mt-0 p-0">
                  <TaxSettings onSave={() => handleSave("tax")} />
                </TabsContent>
                <TabsContent value="integrations" className="mt-0 p-0">
                  <IntegrationSettings onSave={() => handleSave("integration")} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsManager;
