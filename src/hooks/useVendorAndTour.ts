import { useState, useEffect } from 'react';
import { Vendor, Tour } from '../lib/types';
import { api } from '../lib/api';

export function useVendorAndTour(vendorId: number, tourId: number) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vendorData, tourData] = await Promise.all([
          api.getVendorById(vendorId),
          api.getTourById(tourId)
        ]);
        
        setVendor(vendorData);
        setTour(tourData);
        setError(null);
      } catch (err) {
        setError(`Failed to load vendor and tour details: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    if (vendorId && tourId) {
      fetchData();
    }
  }, [vendorId, tourId]);

  return { vendor, tour, loading, error };
}