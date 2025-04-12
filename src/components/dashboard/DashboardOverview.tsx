
import React from 'react';
import { BarChart3, ShoppingCart, DollarSign, Package, ArrowUpRight, Clock, Users } from 'lucide-react';
import StatusCard from '../common/StatusCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend 
} from 'recharts';

const salesData = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 1900 },
  { day: 'Wed', sales: 1500 },
  { day: 'Thu', sales: 2200 },
  { day: 'Fri', sales: 3000 },
  { day: 'Sat', sales: 1800 },
  { day: 'Sun', sales: 1100 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Food & Beverages', value: 25 },
  { name: 'Clothing', value: 20 },
  { name: 'Other', value: 20 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

const RecentActivityItem = ({ title, time, amount, type }: { title: string, time: string, amount: string, type: 'sale' | 'return' }) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`p-2 rounded-full ${type === 'sale' ? 'bg-green-100 text-pos-green' : 'bg-red-100 text-pos-red'}`}>
        {type === 'sale' ? <ShoppingCart size={16} /> : <ArrowUpRight size={16} />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <p className={`font-medium ${type === 'sale' ? 'text-pos-green' : 'text-pos-red'}`}>{amount}</p>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        
        <div className="flex items-center gap-2">
          <select className="pos-input text-sm">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>Custom range</option>
          </select>
          
          <button className="pos-btn pos-btn-primary">
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          title="Daily Sales" 
          value="$3,240.00" 
          trend={{ value: 12.5, isPositive: true }}
          icon={<DollarSign size={24} />}
        />
        <StatusCard 
          title="Orders Today" 
          value="32" 
          trend={{ value: 3.2, isPositive: true }}
          icon={<ShoppingCart size={24} />}
        />
        <StatusCard 
          title="Low Stock Items" 
          value="8" 
          trend={{ value: 5.1, isPositive: false }}
          icon={<Package size={24} />}
        />
        <StatusCard 
          title="Active Customers" 
          value="156" 
          trend={{ value: 8.3, isPositive: true }}
          icon={<Users size={24} />}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 pos-card h-80">
          <div className="pos-card-header">
            <BarChart3 size={20} />
            <span>Sales Overview</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={80} tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="pos-card h-80">
          <div className="pos-card-header">
            <Package size={20} />
            <span>Sales by Category</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 pos-card">
          <div className="pos-card-header mb-4">
            <Clock size={20} />
            <span>Recent Activity</span>
          </div>
          <div className="space-y-0">
            <RecentActivityItem 
              title="Sale #1042" 
              time="10 minutes ago" 
              amount="$85.00" 
              type="sale"
            />
            <RecentActivityItem 
              title="Return #204" 
              time="25 minutes ago" 
              amount="-$35.50" 
              type="return"
            />
            <RecentActivityItem 
              title="Sale #1041" 
              time="45 minutes ago" 
              amount="$124.30" 
              type="sale"
            />
            <RecentActivityItem 
              title="Sale #1040" 
              time="1 hour ago" 
              amount="$54.75" 
              type="sale"
            />
            <RecentActivityItem 
              title="Sale #1039" 
              time="2 hours ago" 
              amount="$212.99" 
              type="sale"
            />
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-pos-blue hover:underline">
              View All Activity
            </button>
          </div>
        </div>
        
        <div className="pos-card">
          <div className="pos-card-header mb-4">
            <Package size={20} />
            <span>Low Stock Alerts</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bluetooth Earbuds</p>
                <p className="text-sm text-pos-red">2 items left</p>
              </div>
              <button className="text-pos-blue hover:underline text-sm">
                Reorder
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">USB-C Charger</p>
                <p className="text-sm text-pos-red">3 items left</p>
              </div>
              <button className="text-pos-blue hover:underline text-sm">
                Reorder
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Smartphone Case</p>
                <p className="text-sm text-pos-red">4 items left</p>
              </div>
              <button className="text-pos-blue hover:underline text-sm">
                Reorder
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wireless Mouse</p>
                <p className="text-sm text-pos-yellow">5 items left</p>
              </div>
              <button className="text-pos-blue hover:underline text-sm">
                Reorder
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-pos-blue hover:underline">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
