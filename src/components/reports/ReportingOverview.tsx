
import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Printer } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Sample data
const dailySalesData = [
  { date: '2023-06-01', sales: 1200 },
  { date: '2023-06-02', sales: 1900 },
  { date: '2023-06-03', sales: 1500 },
  { date: '2023-06-04', sales: 2200 },
  { date: '2023-06-05', sales: 3000 },
  { date: '2023-06-06', sales: 1800 },
  { date: '2023-06-07', sales: 1100 },
];

const topSellingProducts = [
  { name: 'Bluetooth Headphones', sales: 42, revenue: 2519.58 },
  { name: 'Wireless Mouse', sales: 35, revenue: 873.25 },
  { name: 'USB-C Charger Cable', sales: 30, revenue: 389.70 },
  { name: 'T-Shirt (Black)', sales: 28, revenue: 559.72 },
  { name: 'Energy Drink', sales: 25, revenue: 87.25 },
];

const salesByCategory = [
  { category: 'Electronics', sales: 7500 },
  { category: 'Clothing', sales: 4200 },
  { category: 'Food & Beverages', sales: 3100 },
  { category: 'Accessories', sales: 2400 },
  { category: 'Other', sales: 1800 },
];

const ReportingOverview = () => {
  const [timeRange, setTimeRange] = useState('This Week');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Sales Reports</h2>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="pos-input flex items-center gap-2">
              <Calendar size={16} />
              <span>{timeRange}</span>
              <ChevronDown size={16} />
            </button>
            {/* Dropdown would go here in a real app */}
          </div>
          
          <button className="flex items-center gap-2 pos-btn pos-btn-secondary">
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button className="flex items-center gap-2 pos-btn pos-btn-secondary">
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pos-card">
          <p className="text-sm text-gray-500 mb-1">Total Sales</p>
          <p className="text-2xl font-bold">$19,024.75</p>
          <p className="text-sm text-green-600 mt-1">+12.5% vs. last period</p>
        </div>
        
        <div className="pos-card">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold">327</p>
          <p className="text-sm text-green-600 mt-1">+8.3% vs. last period</p>
        </div>
        
        <div className="pos-card">
          <p className="text-sm text-gray-500 mb-1">Average Order Value</p>
          <p className="text-2xl font-bold">$58.18</p>
          <p className="text-sm text-green-600 mt-1">+4.2% vs. last period</p>
        </div>
      </div>
      
      {/* Sales Chart */}
      <div className="pos-card h-80">
        <div className="pos-card-header mb-2">
          <span>Daily Sales</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { weekday: 'short' });
                }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                width={80}
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Sales']}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Selling Products & Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="pos-card">
          <div className="pos-card-header mb-4">
            <span>Top Selling Products</span>
          </div>
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead className="pos-table-header">
                <tr>
                  <th className="pos-table-header-cell">Product</th>
                  <th className="pos-table-header-cell">Units Sold</th>
                  <th className="pos-table-header-cell">Revenue</th>
                </tr>
              </thead>
              <tbody className="pos-table-body">
                {topSellingProducts.map((product, index) => (
                  <tr key={index} className="pos-table-row">
                    <td className="pos-table-cell font-medium">{product.name}</td>
                    <td className="pos-table-cell">{product.sales}</td>
                    <td className="pos-table-cell">${product.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="pos-card h-80">
          <div className="pos-card-header mb-2">
            <span>Sales by Category</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="category" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={80} tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Legend />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingOverview;
