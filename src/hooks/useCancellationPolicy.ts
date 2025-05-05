import { useState, useEffect } from 'react';
import { CancellationPolicy, CancellationPolicyForm } from '../lib/types';
import { api } from '../lib/api';
import { useAlert } from '../contexts/AlertContext';

export function useCancellationPolicy(vendorId: number, tourId: number) {
  const [policy, setPolicy] = useState<CancellationPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const { addAlert } = useAlert();

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const response = await api.getCancellationPolicyByVendorAndTour(vendorId, tourId);
      if (response && response.length > 0) {
        setPolicy(response[0]);
      } else {
        setPolicy(null);
      }
      setError(null);
    } catch (err) {
      setError(`Failed to load cancellation policy: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const updatePolicy = async (formData: CancellationPolicyForm) => {
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      
      if (policy) {
        const updatedPolicy = await api.updateCancellationPolicy(policy.id, formData);
        setPolicy(updatedPolicy);
        addAlert('success', 'Cancellation policy updated successfully');
      } else {
        const newPolicy = await api.createCancellationPolicy({
          vendorId,
          tourId,
          status: formData.status,
          cancellationBeforeMinutes: formData.cancellationBeforeMinutes
        });
        setPolicy(newPolicy);
        addAlert('success', 'Cancellation policy created successfully');
      }
      
      return true;
    } catch (err) {
      const errorMsg = `Failed to ${policy ? 'update' : 'create'} cancellation policy: ${(err as Error).message}`;
      setUpdateError(errorMsg);
      addAlert('error', errorMsg);
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId && tourId) {
      fetchPolicy();
    }
  }, [vendorId, tourId]);

  return {
    policy,
    loading,
    error,
    updatePolicy,
    updateLoading,
    updateError,
    fetchPolicy
  };
}