
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
import { PlusCircle, Trash2, Edit, ArrowUpDown } from "lucide-react";
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

interface ProductSettingsProps {
  onSave: () => void;
}

// Define types for our data structures
interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface Unit {
  id: string;
  name: string;
  abbreviation: string;
  active: boolean;
}

const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
  active: z.boolean().default(true)
});

const unitSchema = z.object({
  name: z.string().min(1, { message: "Unit name is required" }),
  abbreviation: z.string().min(1, { message: "Abbreviation is required" }),
  active: z.boolean().default(true)
});

const ProductSettings = ({ onSave }: ProductSettingsProps) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Beverages', description: 'Drinks and liquid refreshments', active: true },
    { id: '2', name: 'Food', description: 'Edible items and snacks', active: true },
    { id: '3', name: 'Electronics', description: 'Electronic devices and accessories', active: false },
  ]);
  
  const [units, setUnits] = useState<Unit[]>([
    { id: '1', name: 'Each', abbreviation: 'ea', active: true },
    { id: '2', name: 'Kilogram', abbreviation: 'kg', active: true },
    { id: '3', name: 'Liter', abbreviation: 'L', active: true },
  ]);
  
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  
  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  });
  
  const unitForm = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      active: true,
    },
  });
  
  function onSubmitCategory(values: z.infer<typeof categorySchema>) {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { 
          ...cat, 
          name: values.name,
          description: values.description || '',
          active: values.active
        } : cat
      ));
    } else {
      const newCategory: Category = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
        description: values.description || '',
        active: values.active,
      };
      setCategories([...categories, newCategory]);
    }
    
    setCategoryDialogOpen(false);
    categoryForm.reset();
    setEditingCategory(null);
    onSave();
  }
  
  function onSubmitUnit(values: z.infer<typeof unitSchema>) {
    if (editingUnit) {
      setUnits(units.map(unit => 
        unit.id === editingUnit.id ? {
          ...unit,
          name: values.name,
          abbreviation: values.abbreviation,
          active: values.active
        } : unit
      ));
    } else {
      const newUnit: Unit = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
        abbreviation: values.abbreviation,
        active: values.active,
      };
      setUnits([...units, newUnit]);
    }
    
    setUnitDialogOpen(false);
    unitForm.reset();
    setEditingUnit(null);
    onSave();
  }
  
  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };
  
  const deleteUnit = (id: string) => {
    setUnits(units.filter(unit => unit.id !== id));
  };
  
  const editCategory = (category: Category) => {
    setEditingCategory(category);
    categoryForm.reset({
      name: category.name,
      description: category.description,
      active: category.active,
    });
    setCategoryDialogOpen(true);
  };
  
  const editUnit = (unit: Unit) => {
    setEditingUnit(unit);
    unitForm.reset({
      name: unit.name,
      abbreviation: unit.abbreviation,
      active: unit.active,
    });
    setUnitDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Product Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage product categories, units, and other product-related configurations.
        </p>
      </div>
      <Separator />
      
      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium">Product Categories</h4>
          <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCategory(null);
                categoryForm.reset({
                  name: "",
                  description: "",
                  active: true,
                });
              }}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Add Category"}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory ? "Update category details." : "Create a new product category."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...categoryForm}>
                <form onSubmit={categoryForm.handleSubmit(onSubmitCategory)} className="space-y-4">
                  <FormField
                    control={categoryForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter category name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={categoryForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter category description (optional)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={categoryForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Only active categories will be available for product assignment
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
                      {editingCategory ? "Save Changes" : "Add Category"}
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
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    No categories configured. Add your first category.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        category.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => editCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteCategory(category.id)}
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
      
      <Separator />
      
      {/* Units Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium">Measurement Units</h4>
          <Dialog open={unitDialogOpen} onOpenChange={setUnitDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingUnit(null);
                unitForm.reset({
                  name: "",
                  abbreviation: "",
                  active: true,
                });
              }}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingUnit ? "Edit Unit" : "Add Unit"}
                </DialogTitle>
                <DialogDescription>
                  {editingUnit ? "Update unit details." : "Create a new measurement unit."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...unitForm}>
                <form onSubmit={unitForm.handleSubmit(onSubmitUnit)} className="space-y-4">
                  <FormField
                    control={unitForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter unit name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={unitForm.control}
                    name="abbreviation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Abbreviation</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter unit abbreviation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={unitForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Only active units will be available for product assignment
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
                      {editingUnit ? "Save Changes" : "Add Unit"}
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
                <TableHead>Name</TableHead>
                <TableHead>Abbreviation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    No units configured. Add your first measurement unit.
                  </TableCell>
                </TableRow>
              ) : (
                units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell>{unit.abbreviation}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        unit.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {unit.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => editUnit(unit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteUnit(unit.id)}
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
      
      <Separator />
      
      {/* Product Defaults */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Product Defaults</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <h5 className="font-medium mb-2">Default Product Settings</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Default Category</span>
                <Select defaultValue="1">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Default Unit</span>
                <Select defaultValue="1">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h5 className="font-medium mb-2">Stock Management</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Track Inventory</span>
                  <p className="text-xs text-muted-foreground">Enable inventory tracking for new products</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Low Stock Alerts</span>
                  <p className="text-xs text-muted-foreground">Show alerts when products are low in stock</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onSave}>Save Product Settings</Button>
      </div>
    </div>
  );
};

export default ProductSettings;
