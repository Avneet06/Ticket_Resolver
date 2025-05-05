import React from 'react';
import { Ticket } from '../lib/types';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';
import NewListingWorkflow from './workflows/NewListingWorkflow';
import MultiVariantWorkflow from './workflows/MultiVariantWorkflow';

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onClose }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{ticket.productName}</h2>
          <p className="text-sm text-gray-500">ID: {ticket.id}</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardHeader>
      
      <CardBody>
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">Ticket Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Vendor ID</p>
              <p className="font-medium">{ticket.vendorId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tour ID</p>
              <p className="font-medium">{ticket.tourId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Listing Type</p>
              <p className="font-medium capitalize">{ticket.listingType.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
        
        {ticket.listingType === 'new_listing' ? (
          <NewListingWorkflow ticket={ticket} />
        ) : (
          <MultiVariantWorkflow ticket={ticket} />
        )}
      </CardBody>
    </Card>
  );
};

export default TicketDetail;