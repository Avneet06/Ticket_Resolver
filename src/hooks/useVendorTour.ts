import { useState, useEffect } from 'react';
import { VendorTour } from '../lib/types';
import { api } from '../lib/api';
import { useAlert } from '../contexts/AlertContext';

export function useVendorTour(vendorId: number, tourId: number) {
  const [vendorTour, setVendorTour] = useState<VendorTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addAlert } = useAlert();

  const fetchVendorTour = async () => {
    try {
      setLoading(true);
      const response = await api.getVendorTourByVendorAndTour(vendorId, tourId);
      if (response && response.length > 0) {
        setVendorTour(response[0]);
      } else {
        setVendorTour(null);
      }
      setError(null);
    } catch (err) {
      const errorMsg = `Failed to check vendor tour: ${(err as Error).message}`;
      setError(errorMsg);
      addAlert('error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const createVendorTour = async () => {
    try {
      setLoading(true);
      const newTour = await api.createVendorTour({
        vendorId,
        tourId
      });
      setVendorTour(newTour);
      addAlert('success', 'Vendor tour created successfully');
      setError(null);
      return true;
    } catch (err) {
      const errorMsg = `Failed to create vendor tour: ${(err as Error).message}`;
      setError(errorMsg);
      addAlert('error', errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId && tourId) {
      fetchVendorTour();
    }
  }, [vendorId, tourId]);

  return { 
    vendorTour, 
    loading, 
    error, 
    createVendorTour,
    fetchVendorTour
  };
}