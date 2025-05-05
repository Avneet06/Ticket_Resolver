import React from 'react';
import { Ticket } from '../lib/types';
import { Card, CardBody } from './ui/Card';
import { useVendorAndTour } from '../hooks/useVendorAndTour';
import { Loader } from './ui/Loader';
import { MapPin, Calendar, Building2, ChevronRight } from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  onSelectTicket: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, selectedTicket, onSelectTicket }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Tickets</h2>
      {tickets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-lg mb-2">No tickets available</div>
          <div className="text-gray-400">Check back later for new tickets</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              isSelected={selectedTicket?.id === ticket.id}
              onSelect={() => onSelectTicket(ticket)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TicketCardProps {
  ticket: Ticket;
  isSelected: boolean;
  onSelect: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, isSelected, onSelect }) => {
  const { vendor, tour, loading, error } = useVendorAndTour(ticket.vendorId, ticket.tourId);
  
  return (
    <Card 
      hover 
      onClick={onSelect} 
      className={`transform transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 scale-[1.02]' 
          : 'hover:scale-[1.02] hover:shadow-lg'
      }`}
    >
      <CardBody className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className={`
              inline-flex px-3 py-1 rounded-full text-sm font-medium
              ${ticket.listingType === 'new_listing' 
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
              }
            `}>
              {ticket.listingType === 'new_listing' ? 'New Listing' : 'Multi Variant'}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {ticket.productName}
          </h3>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-4">
              <Loader size="small" />
            </div>
          ) : error ? (
            <div className="flex-1 text-red-500 text-sm py-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              Error loading details
            </div>
          ) : (
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Building2 className="w-5 h-5 flex-shrink-0 text-gray-400" />
                <span className="text-base">{vendor?.name}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 flex-shrink-0 text-gray-400" />
                <span className="text-base">{tour?.name}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 flex-shrink-0 text-gray-400" />
                <span className="text-base">{tour?.location}</span>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-500">
            <span className="text-sm">Click to manage</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TicketList;