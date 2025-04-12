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
  CardTitle 
} from "@/components/ui/card";
import { 
  CreditCard, 
  Banknote, 
  Wallet, 
  Receipt, 
  CreditCardIcon, 
  Gift
} from "lucide-react";

const paymentSchema = z.object({
  enableCash: z.boolean().default(true),
  cashDrawerNotification: z.boolean().default(true),
  enableCreditCards: z.boolean().default(true),
  creditCardProcessor: z.string().min(1, {
    message: "Please select a credit card processor.",
  }),
  creditCardApiKey: z.string().min(1, {
    message: "API key is required.",
  }),
  enableGiftCards: z.boolean().default(false),
  enableStoreCreditAccounts: z.boolean().default(false),
  requireReceiptForReturns: z.boolean().default(true),
});

interface PaymentSettingsProps {
  onSave: () => void;
}

const PaymentSettings = ({ onSave }: PaymentSettingsProps) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      enableCash: true,
      cashDrawerNotification: true,
      enableCreditCards: true,
      creditCardProcessor: "stripe",
      creditCardApiKey: "sk_test_******",
      enableGiftCards: false,
      enableStoreCreditAccounts: false,
      requireReceiptForReturns: true,
    },
  });

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    console.log(values);
    onSave();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure payment methods and processing options.
        </p>
      </div>
      <Separator />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cash Settings Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Cash Payments</CardTitle>
                </div>
                <CardDescription>
                  Settings for cash transactions and drawer management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableCash"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2">
                        <FormLabel>Accept cash payments</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("enableCash") && (
                    <FormField
                      control={form.control}
                      name="cashDrawerNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2">
                          <div className="space-y-0.5">
                            <FormLabel>Cash drawer alerts</FormLabel>
                            <FormDescription className="text-xs">
                              Receive notifications when cash drawer is left open
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Credit Card Settings Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Credit Card Payments</CardTitle>
                </div>
                <CardDescription>
                  Configure credit card processing settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableCreditCards"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2">
                        <FormLabel>Accept credit card payments</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("enableCreditCards") && (
                    <>
                      <FormField
                        control={form.control}
                        name="creditCardProcessor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Processor</FormLabel>
                            <FormControl>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="stripe">Stripe</option>
                                <option value="square">Square</option>
                                <option value="paypal">PayPal</option>
                                <option value="authorize">Authorize.net</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="creditCardApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter API key" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Your payment processor API key
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Other Payment Methods Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Alternative Payments</CardTitle>
                </div>
                <CardDescription>
                  Additional payment options for your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableGiftCards"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <FormLabel className="flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            Gift Cards
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Allow customers to purchase and redeem gift cards
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="enableStoreCreditAccounts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <FormLabel className="flex items-center gap-2">
                            <CreditCardIcon className="h-4 w-4" />
                            Store Credit
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Allow customers to have store credit accounts
                          </FormDescription>
                        </div>
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
              </CardContent>
            </Card>
            
            {/* Returns Policy Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Returns Policy</CardTitle>
                </div>
                <CardDescription>
                  Configure return and refund policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="requireReceiptForReturns"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <FormLabel>Require receipt for returns</FormLabel>
                          <FormDescription className="text-xs">
                            Customers must present receipt for refunds
                          </FormDescription>
                        </div>
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
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Payment Settings</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentSettings;
