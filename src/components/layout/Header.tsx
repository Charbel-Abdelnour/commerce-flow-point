
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input 
            type="search" 
            className="pos-input pl-10 w-full" 
            placeholder="Search products, orders, or customers..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pos-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pos-red"></span>
          </span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-pos-blue-dark flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
