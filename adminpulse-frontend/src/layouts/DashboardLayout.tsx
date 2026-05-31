import { useEffect, useState } from 'react';
import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL } from '../constants/admin';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep navbar/settings in sync if browser still has an old cached name
  useEffect(() => {
    if (localStorage.getItem('adminEmail') === ADMIN_EMAIL) {
      localStorage.setItem('adminName', ADMIN_DISPLAY_NAME);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
