
import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Edit, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample product data
const initialInventory = [
  { id: '1', name: 'Bluetooth Headphones', sku: 'BT-HP-001', category: 'Electronics', stock: 15, price: 59.99, cost: 35.00 },
  { id: '2', name: 'USB-C Charger Cable', sku: 'USB-C-001', category: 'Electronics', stock: 23, price: 12.99, cost: 5.50 },
  { id: '3', name: 'Wireless Mouse', sku: 'WL-MS-001', category: 'Electronics', stock: 7, price: 24.95, cost: 14.20 },
  { id: '4', name: 'T-Shirt (Black)', sku: 'APP-TS-BLK', category: 'Clothing', stock: 42, price: 19.99, cost: 8.75 },
  { id: '5', name: 'Baseball Cap', sku: 'APP-CAP-001', category: 'Clothing', stock: 19, price: 14.99, cost: 6.25 },
  { id: '6', name: 'Coffee Mug', sku: 'HW-MUG-001', category: 'Accessories', stock: 31, price: 8.99, cost: 3.15 },
  { id: '7', name: 'Protein Bar', sku: 'FB-BAR-001', category: 'Food & Beverages', stock: 54, price: 2.49, cost: 1.20 },
  { id: '8', name: 'Energy Drink', sku: 'FB-DRK-001', category: 'Food & Beverages', stock: 62, price: 3.49, cost: 1.75 },
];

const InventoryManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inventory, setInventory] = useState(initialInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    stock: 0,
    price: 0,
    cost: 0
  });
  
  const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Food & Beverages'];
  
  const filteredInventory = inventory.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'stock' || name === 'price' || name === 'cost') {
      // Convert string to number for numerical fields
      setNewProduct({
        ...newProduct,
        [name]: value === '' ? 0 : parseFloat(value)
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct({
      ...newProduct,
      category: value
    });
  };

  const handleAddProduct = () => {
    // Validate required fields
    if (!newProduct.name || !newProduct.sku) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if SKU already exists
    if (inventory.some(item => item.sku === newProduct.sku)) {
      toast({
        title: "Duplicate SKU",
        description: "This SKU already exists. Please use a unique SKU.",
        variant: "destructive"
      });
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: Math.random().toString(36).substring(2, 9),
    };

    setInventory([...inventory, productToAdd]);
    setIsModalOpen(false);
    resetForm();
    
    toast({
      title: "Product added",
      description: `${productToAdd.name} has been added to inventory`,
    });
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      sku: '',
      category: 'Electronics',
      stock: 0,
      price: 0,
      cost: 0
    });
  };

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    const productName = inventory.find(item => item.id === productToDelete)?.name;
    setInventory(inventory.filter(item => item.id !== productToDelete));
    setIsDeleteConfirmOpen(false);
    setProductToDelete(null);
    
    toast({
      title: "Product deleted",
      description: `${productName} has been removed from inventory`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 pos-btn pos-btn-secondary">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button 
            className="flex items-center gap-2 pos-btn pos-btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="search"
            placeholder="Search by name or SKU..."
            className="pos-input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <span className="text-sm font-medium">Category:</span>
          </div>
          <select 
            className="pos-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="pos-table">
            <thead className="pos-table-header">
              <tr>
                <th className="pos-table-header-cell">Product Name</th>
                <th className="pos-table-header-cell">SKU</th>
                <th className="pos-table-header-cell">Category</th>
                <th className="pos-table-header-cell">Stock</th>
                <th className="pos-table-header-cell">Price</th>
                <th className="pos-table-header-cell">Cost</th>
                <th className="pos-table-header-cell">Margin</th>
                <th className="pos-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="pos-table-body">
              {filteredInventory.map(product => {
                const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);
                
                return (
                  <tr key={product.id} className="pos-table-row">
                    <td className="pos-table-cell font-medium text-gray-900">{product.name}</td>
                    <td className="pos-table-cell">{product.sku}</td>
                    <td className="pos-table-cell">{product.category}</td>
                    <td className="pos-table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' : 
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="pos-table-cell">${product.price.toFixed(2)}</td>
                    <td className="pos-table-cell">${product.cost.toFixed(2)}</td>
                    <td className="pos-table-cell">{margin}%</td>
                    <td className="pos-table-cell">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-500 hover:text-blue-700">
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => confirmDelete(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="pos-table-cell text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <p>No products found.</p>
                      <p className="text-sm">Try a different search term or category.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the product details below to add it to your inventory.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name" className="text-right">
                Product Name*
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="sku" className="text-right">
                SKU*
              </Label>
              <Input
                id="sku"
                name="sku"
                placeholder="Enter product SKU"
                value={newProduct.sku}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={newProduct.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={newProduct.stock || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.price || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="cost" className="text-right">
                  Cost
                </Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.cost || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsModalOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
