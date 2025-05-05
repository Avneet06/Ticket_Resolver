import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  Box
} from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import TicketManagement from '../pages/TicketManagement';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '60px', transition: { duration: 0.3 } }
  };

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tickets', icon: Ticket, label: 'Tickets' },
    { path: '/vendors', icon: Users, label: 'Vendors' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.nav 
        initial="open"
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="bg-[#1a1f37] text-white flex flex-col"
      >
        <div className="p-4 flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 font-semibold text-lg"
            >
              Admin
            </motion.span>
          )}
        </div>

        <div className="flex-1 py-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `
                flex items-center px-4 py-2 my-1 mx-2 rounded-lg transition-colors
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}
              `}
            >
              <Icon size={20} />
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3"
                >
                  {label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.nav>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@example.com</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Box size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketManagement />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;