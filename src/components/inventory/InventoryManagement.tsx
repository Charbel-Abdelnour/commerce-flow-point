
import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Edit, Trash2, RefreshCw } from 'lucide-react';

// Sample product data
const sampleInventory = [
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Food & Beverages'];
  
  const filteredInventory = sampleInventory.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
                        <button className="p-1 text-red-500 hover:text-red-700">
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
      
      {/* Add Product Modal - Just a placeholder for this demo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <p className="mb-6">This would be a form for adding new products in a real application.</p>
            <div className="flex justify-end gap-3">
              <button 
                className="pos-btn pos-btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="pos-btn pos-btn-primary"
                onClick={() => {
                  setIsModalOpen(false);
                  alert('Product added successfully!');
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
