import React from 'react';
import { CancellationPolicyForm as FormType } from '../../lib/types';
import { Button } from '../ui/Button';

interface CancellationPolicyFormProps {
  initialValues: FormType;
  onSubmit: (values: FormType) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const CancellationPolicyForm: React.FC<CancellationPolicyFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  error
}) => {
  const [values, setValues] = React.useState<FormType>(initialValues);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'cancellationBeforeMinutes') {
      const numberValue = value === '' ? null : parseInt(value, 10);
      setValues(prev => ({ ...prev, [name]: numberValue }));
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="cancellationBeforeMinutes" className="block text-sm font-medium text-gray-700 mb-1">
            Cancellation Before (minutes)
          </label>
          <input
            type="number"
            name="cancellationBeforeMinutes"
            id="cancellationBeforeMinutes"
            value={values.cancellationBeforeMinutes === null ? '' : values.cancellationBeforeMinutes}
            onChange={handleChange}
            placeholder="Enter minutes before cancellation"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            disabled={isLoading}
            min={0}
          />
          <p className="mt-1 text-sm text-gray-500">
            Leave empty for no time restriction
          </p>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {initialValues.status ? 'Update Policy' : 'Create Policy'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CancellationPolicyForm;
