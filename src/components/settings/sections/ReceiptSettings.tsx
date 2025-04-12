
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  UploadIcon,
  Printer,
  Mail,
  Phone,
  Receipt
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const receiptSchema = z.object({
  businessName: z.string().min(1, {
    message: "Business name is required.",
  }),
  headerText: z.string(),
  footerText: z.string(),
  includeLogo: z.boolean().default(true),
  includeBarcode: z.boolean().default(true),
  includeTaxDetails: z.boolean().default(true),
  showDiscountDetails: z.boolean().default(true),
  enableEmailReceipts: z.boolean().default(true),
  enableSmsReceipts: z.boolean().default(false),
  receiptPrinterType: z.string(),
  paperSize: z.string(),
  fontSize: z.string(),
  enableAutoReceipt: z.boolean().default(true),
});

interface ReceiptSettingsProps {
  onSave: () => void;
}

const ReceiptSettings = ({ onSave }: ReceiptSettingsProps) => {
  const form = useForm<z.infer<typeof receiptSchema>>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      businessName: "FlowPOS Store",
      headerText: "Thank you for shopping with us!",
      footerText: "Return policy: Items can be returned within 30 days with receipt.",
      includeLogo: true,
      includeBarcode: true,
      includeTaxDetails: true,
      showDiscountDetails: true,
      enableEmailReceipts: true,
      enableSmsReceipts: false,
      receiptPrinterType: "thermal80mm",
      paperSize: "80mm",
      fontSize: "medium",
      enableAutoReceipt: true,
    },
  });

  function onSubmit(values: z.infer<typeof receiptSchema>) {
    console.log(values);
    onSave();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Receipt Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how receipts are generated and displayed to customers.
        </p>
      </div>
      <Separator />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Content Settings</h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This appears at the top of each receipt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-end space-x-4">
                <FormField
                  control={form.control}
                  name="includeLogo"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Include Logo</FormLabel>
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
                
                {form.watch("includeLogo") && (
                  <Button type="button" variant="outline" size="sm">
                    <UploadIcon className="mr-2 h-4 w-4" /> Upload Logo
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="headerText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter header message that appears at the top of receipts" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="footerText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter footer message that appears at the bottom of receipts" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include details like return policy, store hours, or promotional messages
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-md font-medium">Receipt Details</h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="includeBarcode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Include Receipt Barcode</FormLabel>
                      <FormDescription>
                        Add barcode for easy receipt lookup
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
                name="includeTaxDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Include Tax Details</FormLabel>
                      <FormDescription>
                        Show itemized tax information
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
                name="showDiscountDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Show Discount Details</FormLabel>
                      <FormDescription>
                        Display applied discounts and promotions
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
                name="enableAutoReceipt"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Automatic Printing</FormLabel>
                      <FormDescription>
                        Print receipts automatically after each sale
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
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-md font-medium">Delivery Options</h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableEmailReceipts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Receipts
                      </FormLabel>
                      <FormDescription>
                        Allow sending receipts via email
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
                name="enableSmsReceipts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        SMS Receipts
                      </FormLabel>
                      <FormDescription>
                        Allow sending receipts via text message
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
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-md font-medium">Printer Settings</h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="receiptPrinterType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Printer Type
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select printer type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="thermal80mm">Thermal 80mm</SelectItem>
                        <SelectItem value="thermal58mm">Thermal 58mm</SelectItem>
                        <SelectItem value="dotMatrix">Dot Matrix</SelectItem>
                        <SelectItem value="inkjet">Inkjet/Laser</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paperSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="80mm">80mm</SelectItem>
                        <SelectItem value="58mm">58mm</SelectItem>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Receipt Settings</Button>
          </div>
        </form>
      </Form>
      
      <Separator />
      
      <div className="mt-6">
        <h4 className="text-md font-medium mb-4">Receipt Preview</h4>
        <div className="bg-white border rounded-md p-4 max-w-sm mx-auto">
          <div className="flex justify-center mb-2">
            {form.watch("includeLogo") && (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <Receipt className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="text-center">
            <h5 className="font-bold text-lg mb-1">{form.watch("businessName")}</h5>
            <p className="text-sm text-gray-600 mb-3">{form.watch("headerText")}</p>
          </div>
          <div className="border-t border-b py-3 my-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Item 1</span>
              <span className="text-sm">$10.00</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Item 2</span>
              <span className="text-sm">$15.00</span>
            </div>
            {form.watch("showDiscountDetails") && (
              <div className="flex justify-between mb-1 text-green-500">
                <span className="text-sm">Discount</span>
                <span className="text-sm">-$2.50</span>
              </div>
            )}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>$22.50</span>
            </div>
            {form.watch("includeTaxDetails") && (
              <div className="text-xs text-gray-500 mt-1">
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>$1.80</span>
                </div>
              </div>
            )}
          </div>
          <div className="text-center text-xs text-gray-500">
            <p>{form.watch("footerText")}</p>
            <p className="mt-2">Thank you for your purchase!</p>
            {form.watch("includeBarcode") && (
              <div className="mt-2 bg-gray-300 h-8 mx-auto w-3/4"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptSettings;
