import React from 'react';
import { Ticket } from '../../lib/types';
import CancellationPolicyForm from '../forms/CancellationPolicyForm';
import ContactForm from '../forms/ContactForm';
import { useCancellationPolicy } from '../../hooks/useCancellationPolicy';
import { useContact } from '../../hooks/useContact';
import { Loader } from '../ui/Loader';

interface NewListingWorkflowProps {
  ticket: Ticket;
}

const NewListingWorkflow: React.FC<NewListingWorkflowProps> = ({ ticket }) => {
  const { vendorId, tourId } = ticket;
  
  const { 
    policy,
    loading: policyLoading,
    error: policyError,
    updatePolicy,
    updateLoading: policyUpdateLoading,
    updateError: policyUpdateError,
    fetchPolicy
  } = useCancellationPolicy(vendorId, tourId);
  
  const {
    contact,
    loading: contactLoading,
    error: contactError,
    updateContact,
    updateLoading: contactUpdateLoading,
    updateError: contactUpdateError,
    fetchContact
  } = useContact(vendorId, tourId);

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
        <h4 className="font-medium text-blue-800 mb-2">New Listing Workflow</h4>
        <p className="text-blue-700 text-sm">
          Update the cancellation policy and contact information for this ticket.
        </p>
      </div>
      
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h4 className="font-medium text-gray-800">Cancellation Policy</h4>
        </div>
        
        <div className="p-4">
          {policyLoading ? (
            <div className="py-4 flex justify-center">
              <Loader size="small" />
            </div>
          ) : policyError ? (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {policyError}
              <button 
                className="block mt-2 text-sm font-medium text-red-700 underline"
                onClick={fetchPolicy}
              >
                Retry
              </button>
            </div>
          ) : (
            <CancellationPolicyForm
              initialValues={{
                status: policy?.status || 'ACTIVE',
                cancellationBeforeMinutes: policy?.cancellationBeforeMinutes || null
              }}
              onSubmit={updatePolicy}
              isLoading={policyUpdateLoading}
              error={policyUpdateError}
            />
          )}
        </div>
      </section>
      
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h4 className="font-medium text-gray-800">Contact Information</h4>
        </div>
        
        <div className="p-4">
          {contactLoading ? (
            <div className="py-4 flex justify-center">
              <Loader size="small" />
            </div>
          ) : contactError ? (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {contactError}
              <button 
                className="block mt-2 text-sm font-medium text-red-700 underline"
                onClick={fetchContact}
              >
                Retry
              </button>
            </div>
          ) : (
            <ContactForm
              initialValues={{
                phone: contact?.phone || '',
                email: contact?.email || ''
              }}
              onSubmit={updateContact}
              isLoading={contactUpdateLoading}
              error={contactUpdateError}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default NewListingWorkflow;
