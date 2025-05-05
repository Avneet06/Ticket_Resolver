import React, { useState } from 'react';
import TicketList from '../components/TicketList';
import TicketDetail from '../components/TicketDetail';
import { useTickets } from '../hooks/useTickets';
import { Ticket } from '../lib/types';
import { Loader } from '../components/ui/Loader';

const TicketManagement: React.FC = () => {
  const { tickets, loading, error } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="text-red-500 text-lg mb-2">Error loading tickets</div>
        <div className="text-gray-400">Please try again later</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Ticket Management</h1>
      
      {selectedTicket ? (
        <TicketDetail 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      ) : (
        <TicketList 
          tickets={tickets || []} 
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicket}
        />
      )}
    </div>
  );
};

export default TicketManagement;