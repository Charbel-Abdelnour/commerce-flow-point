
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
import { PlusCircle, Trash2, Edit, PercentIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Tax {
  id: string;
  name: string;
  rate: number;
  applicableTo: string;
  active: boolean;
}

interface TaxSettingsProps {
  onSave: () => void;
}

const mockTaxes: Tax[] = [
  {
    id: '1',
    name: 'Sales Tax',
    rate: 7.5,
    applicableTo: 'all',
    active: true
  },
  {
    id: '2',
    name: 'City Tax',
    rate: 1.5,
    applicableTo: 'all',
    active: true
  },
  {
    id: '3',
    name: 'Luxury Tax',
    rate: 10,
    applicableTo: 'specificCategories',
    active: false
  }
];

const taxFormSchema = z.object({
  name: z.string().min(1, { message: "Tax name is required" }),
  rate: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, { message: "Rate must be a positive number" }).max(100, { message: "Rate cannot exceed 100%" })
  ),
  applicableTo: z.string().min(1, { message: "Please select where this tax applies" }),
  active: z.boolean().default(true),
});

const generalTaxSchema = z.object({
  taxIncludedInPrices: z.boolean().default(false),
  showTaxColumnsInReports: z.boolean().default(true),
  enableAutomaticTaxCalculation: z.boolean().default(true),
  defaultTaxRate: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, { message: "Rate must be a positive number" }).max(100, { message: "Rate cannot exceed 100%" })
  ),
});

const TaxSettings = ({ onSave }: TaxSettingsProps) => {
  const [taxes, setTaxes] = useState<Tax[]>(mockTaxes);
  const [editingTax, setEditingTax] = useState<Tax | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const generalForm = useForm<z.infer<typeof generalTaxSchema>>({
    resolver: zodResolver(generalTaxSchema),
    defaultValues: {
      taxIncludedInPrices: false,
      showTaxColumnsInReports: true,
      enableAutomaticTaxCalculation: true,
      defaultTaxRate: 7.5,
    },
  });

  const taxForm = useForm<z.infer<typeof taxFormSchema>>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      name: "",
      rate: 0,
      applicableTo: "all",
      active: true,
    },
  });

  function onSaveGeneral(values: z.infer<typeof generalTaxSchema>) {
    console.log(values);
    onSave();
  }

  function onSaveTax(values: z.infer<typeof taxFormSchema>) {
    if (editingTax) {
      // Update existing tax
      setTaxes(taxes.map(tax => 
        tax.id === editingTax.id ? { ...values, id: tax.id, rate: Number(values.rate) } as Tax : tax
      ));
    } else {
      // Add new tax
      const newTax: Tax = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
        rate: Number(values.rate),
        applicableTo: values.applicableTo,
        active: values.active,
      };
      setTaxes([...taxes, newTax]);
    }
    
    setDialogOpen(false);
    taxForm.reset();
    setEditingTax(null);
    onSave();
  }

  const deleteTax = (id: string) => {
    setTaxes(taxes.filter(tax => tax.id !== id));
  };

  const editTax = (tax: Tax) => {
    setEditingTax(tax);
    taxForm.reset({
      name: tax.name,
      rate: tax.rate,
      applicableTo: tax.applicableTo,
      active: tax.active,
    });
    setDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingTax(null);
    taxForm.reset({
      name: "",
      rate: 0,
      applicableTo: "all",
      active: true,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tax Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure tax rates and preferences for your business.
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-4">General Tax Settings</h4>
          <Form {...generalForm}>
            <form onSubmit={generalForm.handleSubmit(onSaveGeneral)} className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  control={generalForm.control}
                  name="taxIncludedInPrices"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Prices Include Tax</FormLabel>
                        <FormDescription>
                          When enabled, product prices will be shown with tax included
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
                  control={generalForm.control}
                  name="showTaxColumnsInReports"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Show Tax Columns in Reports</FormLabel>
                        <FormDescription>
                          Display detailed tax information in sales reports
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
                  control={generalForm.control}
                  name="enableAutomaticTaxCalculation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Automatic Tax Calculation</FormLabel>
                        <FormDescription>
                          Automatically calculate taxes based on product categories and tax rules
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
                  control={generalForm.control}
                  name="defaultTaxRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Tax Rate (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Applied when no specific tax rule matches
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Save General Settings</Button>
              </div>
            </form>
          </Form>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium">Tax Rates</h4>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNewClick}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tax Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTax ? "Edit Tax Rate" : "Add New Tax Rate"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTax ? "Modify tax details below." : "Create a new tax rate for your products."}
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...taxForm}>
                  <form onSubmit={taxForm.handleSubmit(onSaveTax)} className="space-y-4">
                    <FormField
                      control={taxForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tax name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0" 
                              max="100"
                              placeholder="Enter tax rate percentage"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="applicableTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Applies To</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select where this tax applies" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">All Products</SelectItem>
                              <SelectItem value="specificCategories">Specific Categories</SelectItem>
                              <SelectItem value="specificProducts">Specific Products</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <FormDescription>
                              When enabled, this tax will be applied to sales
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
                    
                    <DialogFooter>
                      <Button type="submit">
                        {editingTax ? "Save Changes" : "Add Tax Rate"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Name</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Applies To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No tax rates configured. Add your first tax rate.
                    </TableCell>
                  </TableRow>
                ) : (
                  taxes.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell className="font-medium">{tax.name}</TableCell>
                      <TableCell className="flex items-center">
                        {tax.rate}%
                        <PercentIcon className="ml-1 h-3 w-3 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        {tax.applicableTo === 'all' ? 'All Products' : 
                         tax.applicableTo === 'specificCategories' ? 'Specific Categories' : 
                         'Specific Products'}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          tax.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tax.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => editTax(tax)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteTax(tax.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSettings;
