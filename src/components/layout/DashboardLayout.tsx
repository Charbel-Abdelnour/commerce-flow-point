
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen ml-[70px] lg:ml-64">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>FlowPOS &copy; {new Date().getFullYear()} - All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
