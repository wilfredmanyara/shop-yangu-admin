// import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className='lg:w-60'>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">


        {/* Page Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
