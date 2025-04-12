
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ReceiptIcon, 
  BarChartIcon, 
  LinkIcon, 
  GlobeIcon, 
  DatabaseIcon,
  MailIcon,
  ShoppingBagIcon,
} from "lucide-react";

const integrationSchema = z.object({
  quickbooksEnabled: z.boolean().default(false),
  quickbooksClientId: z.string().optional(),
  quickbooksClientSecret: z.string().optional(),
  
  shopifyEnabled: z.boolean().default(false),
  shopifyApiKey: z.string().optional(),
  shopifyShopDomain: z.string().optional(),
  
  mailchimpEnabled: z.boolean().default(false),
  mailchimpApiKey: z.string().optional(),
  
  googleAnalyticsEnabled: z.boolean().default(false),
  googleAnalyticsId: z.string().optional(),
  
  zapierEnabled: z.boolean().default(false),
  zapierWebhookUrl: z.string().optional(),
});

interface IntegrationSettingsProps {
  onSave: () => void;
}

const IntegrationSettings = ({ onSave }: IntegrationSettingsProps) => {
  const form = useForm<z.infer<typeof integrationSchema>>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      quickbooksEnabled: false,
      shopifyEnabled: false,
      mailchimpEnabled: false,
      googleAnalyticsEnabled: false,
      zapierEnabled: false,
    },
  });

  function onSubmit(values: z.infer<typeof integrationSchema>) {
    console.log(values);
    onSave();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your POS system with other business tools and services.
        </p>
      </div>
      <Separator />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* QuickBooks Integration */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ReceiptIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>QuickBooks</CardTitle>
                  </div>
                  <FormField
                    control={form.control}
                    name="quickbooksEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CardDescription>
                  Sync transactions, inventory, and financial data with QuickBooks
                </CardDescription>
              </CardHeader>
              {form.watch("quickbooksEnabled") && (
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="quickbooksClientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter QuickBooks client ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quickbooksClientSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Secret</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter QuickBooks client secret" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              )}
              <CardFooter className={form.watch("quickbooksEnabled") ? "" : "pt-0"}>
                <div className="w-full text-right">
                  {form.watch("quickbooksEnabled") && (
                    <Button variant="outline" type="button">
                      Connect Account
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {/* Shopify Integration */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBagIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Shopify</CardTitle>
                  </div>
                  <FormField
                    control={form.control}
                    name="shopifyEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CardDescription>
                  Sync inventory and orders between your POS and Shopify store
                </CardDescription>
              </CardHeader>
              {form.watch("shopifyEnabled") && (
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="shopifyApiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Shopify API key" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shopifyShopDomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shop Domain</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="yourstore.myshopify.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              )}
              <CardFooter className={form.watch("shopifyEnabled") ? "" : "pt-0"}>
                <div className="w-full text-right">
                  {form.watch("shopifyEnabled") && (
                    <Button variant="outline" type="button">
                      Connect Store
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {/* Mailchimp Integration */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MailIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Mailchimp</CardTitle>
                  </div>
                  <FormField
                    control={form.control}
                    name="mailchimpEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CardDescription>
                  Sync customer data with Mailchimp for email marketing
                </CardDescription>
              </CardHeader>
              {form.watch("mailchimpEnabled") && (
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="mailchimpApiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Mailchimp API key" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              )}
              <CardFooter className={form.watch("mailchimpEnabled") ? "" : "pt-0"}>
                <div className="w-full text-right">
                  {form.watch("mailchimpEnabled") && (
                    <Button variant="outline" type="button">
                      Connect Account
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {/* Google Analytics Integration */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChartIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Google Analytics</CardTitle>
                  </div>
                  <FormField
                    control={form.control}
                    name="googleAnalyticsEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CardDescription>
                  Track POS usage and sales analytics
                </CardDescription>
              </CardHeader>
              {form.watch("googleAnalyticsEnabled") && (
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="googleAnalyticsId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Google Analytics ID (UA-XXXXXXXX-X)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              )}
              <CardFooter className={form.watch("googleAnalyticsEnabled") ? "" : "pt-0"}>
                <div className="w-full text-right">
                  {form.watch("googleAnalyticsEnabled") && (
                    <Button variant="outline" type="button">
                      Verify
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {/* Zapier Integration */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Zapier</CardTitle>
                  </div>
                  <FormField
                    control={form.control}
                    name="zapierEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CardDescription>
                  Connect FlowPOS with thousands of other apps through Zapier automations
                </CardDescription>
              </CardHeader>
              {form.watch("zapierEnabled") && (
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="zapierWebhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Zapier webhook URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              )}
              <CardFooter className={form.watch("zapierEnabled") ? "" : "pt-0"}>
                <div className="w-full text-right">
                  {form.watch("zapierEnabled") && (
                    <Button variant="outline" type="button">
                      Test Connection
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Integration Settings</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default IntegrationSettings;
