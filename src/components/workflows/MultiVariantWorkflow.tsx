import React from 'react';
import { Ticket } from '../../lib/types';
import CancellationPolicyForm from '../forms/CancellationPolicyForm';
import ContactForm from '../forms/ContactForm';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MultiVariantWorkflowProps {
  ticket: Ticket;
}

const MultiVariantWorkflow: React.FC<MultiVariantWorkflowProps> = ({ ticket }) => {
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSetup = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSetupComplete(true);
      setIsLoading(false);
    }, 1000);
  };

  if (!isSetupComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-amber-50 border border-amber-100 rounded-md p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-amber-800">Setup Required</h4>
              <p className="mt-2 text-sm text-amber-700">
                Before you can manage the details, we need to set up this vendor-tour combination. 
                This will create a new connection between the vendor and tour.
              </p>
              <div className="mt-4">
                <Button
                  onClick={handleSetup}
                  isLoading={isLoading}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Initialize Setup
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h5 className="font-medium text-gray-900 mb-4">What happens next?</h5>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
                <span className="block w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
              <p className="ml-3 text-sm text-gray-600">
                A new vendor-tour relationship will be created
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
                <span className="block w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
              <p className="ml-3 text-sm text-gray-600">
                You'll be able to set up cancellation policies
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
                <span className="block w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
              <p className="ml-3 text-sm text-gray-600">
                You can manage contact information for this combination
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="bg-green-50 border border-green-100 rounded-md p-4">
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div className="ml-3">
            <h4 className="font-medium text-green-800">Setup Complete</h4>
            <p className="text-green-700 text-sm">
              You can now manage the cancellation policy and contact information.
            </p>
          </div>
        </div>
      </div>
      
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h4 className="font-medium text-gray-800">Cancellation Policy</h4>
        </div>
        
        <div className="p-4">
          <CancellationPolicyForm
            initialValues={{
              status: 'ACTIVE',
              cancellationBeforeMinutes: null
            }}
            onSubmit={async () => true}
            isLoading={false}
            error={null}
          />
        </div>
      </section>
      
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h4 className="font-medium text-gray-800">Contact Information</h4>
        </div>
        
        <div className="p-4">
          <ContactForm
            initialValues={{
              phone: '',
              email: ''
            }}
            onSubmit={async () => true}
            isLoading={false}
            error={null}
          />
        </div>
      </section>
    </motion.div>
  );
};

export default MultiVariantWorkflow;
