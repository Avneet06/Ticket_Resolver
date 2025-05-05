import { useState, useEffect } from 'react';
import { Contact, ContactForm } from '../lib/types';
import { api } from '../lib/api';
import { useAlert } from '../contexts/AlertContext';

export function useContact(vendorId: number, tourId: number) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const { addAlert } = useAlert();

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await api.getContactByVendorAndTour(vendorId, tourId);
      if (response && response.length > 0) {
        setContact(response[0]);
      } else {
        setContact(null);
      }
      setError(null);
    } catch (err) {
      setError(`Failed to load contact information: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (formData: ContactForm) => {
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      
      if (contact) {
        const updatedContact = await api.updateContact(contact.id, formData);
        setContact(updatedContact);
        addAlert('success', 'Contact information updated successfully');
      } else {
        const newContact = await api.createContact({
          vendorId,
          tourId,
          phone: formData.phone,
          email: formData.email
        });
        setContact(newContact);
        addAlert('success', 'Contact information created successfully');
      }
      
      return true;
    } catch (err) {
      const errorMsg = `Failed to ${contact ? 'update' : 'create'} contact information: ${(err as Error).message}`;
      setUpdateError(errorMsg);
      addAlert('error', errorMsg);
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId && tourId) {
      fetchContact();
    }
  }, [vendorId, tourId]);

  return {
    contact,
    loading,
    error,
    updateContact,
    updateLoading,
    updateError,
    fetchContact
  };
}