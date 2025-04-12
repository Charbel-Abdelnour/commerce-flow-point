
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Point of Sale', icon: ShoppingCart, path: '/pos' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Customers', icon: Users, path: '/customers' },
  ];

  const secondaryMenuItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-50 shadow-lg",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground">FlowPOS</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:text-primary p-1 rounded-md"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "pos-sidebar-item",
                  isActive(item.path) && "pos-sidebar-item-active"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-sidebar-border">
            {secondaryMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "pos-sidebar-item",
                  isActive(item.path) && "pos-sidebar-item-active"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
            
            <Link
              to="/login"
              className="pos-sidebar-item mt-8 text-red-400 hover:text-red-300"
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
