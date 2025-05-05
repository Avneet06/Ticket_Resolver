import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useTickets } from '../hooks/useTickets';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { tickets, loading } = useTickets();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = React.useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { 
      title: 'Total Tickets',
      value: loading ? '...' : tickets?.length.toString() || '0',
      icon: Ticket,
      color: 'bg-blue-500'
    },
    {
      title: 'New Listings',
      value: loading ? '...' : tickets?.filter(t => t.listingType === 'new_listing').length.toString() || '0',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Multi-Variant',
      value: loading ? '...' : tickets?.filter(t => t.listingType === 'multi_variant').length.toString() || '0',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Success Rate',
      value: '100%',
      icon: TrendingUp,
      color: 'bg-amber-500'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {showGuide && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Welcome to the Ticket Management System! 👋</h2>
              <p className="text-blue-100">Let's help you get started with managing your tickets.</p>
            </div>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-blue-200 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">1. View Tickets</h3>
              <p className="text-sm text-blue-100">Access all your tickets in one place</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">2. Manage Details</h3>
              <p className="text-sm text-blue-100">Update policies and contact information</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">3. Track Progress</h3>
              <p className="text-sm text-blue-100">Monitor ticket status and updates</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/tickets')}
            className="mt-6 inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Go to Tickets
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      )}

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to the Ticket Management Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button 
              onClick={() => navigate('/tickets')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            ) : tickets && tickets.length > 0 ? (
              tickets.slice(0, 4).map((ticket) => (
                <div key={ticket.id} className="p-6 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Ticket className="text-blue-600" size={20} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {ticket.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Type: {ticket.listingType.replace('_', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/tickets')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No tickets found</div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Ticket Distribution</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : tickets && tickets.length > 0 ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>New Listing</span>
                  <span className="font-medium">
                    {((tickets.filter(t => t.listingType === 'new_listing').length / tickets.length) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${(tickets.filter(t => t.listingType === 'new_listing').length / tickets.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Multi-Variant</span>
                  <span className="font-medium">
                    {((tickets.filter(t => t.listingType === 'multi_variant').length / tickets.length) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-purple-600 rounded-full"
                    style={{
                      width: `${(tickets.filter(t => t.listingType === 'multi_variant').length / tickets.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No data available</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;