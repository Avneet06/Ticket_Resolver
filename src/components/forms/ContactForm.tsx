import React from 'react';
import { ContactForm as FormType } from '../../lib/types';
import { Button } from '../ui/Button';

interface ContactFormProps {
  initialValues: FormType;
  onSubmit: (values: FormType) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const ContactForm: React.FC<ContactFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  error
}) => {
  const [values, setValues] = React.useState<FormType>(initialValues);
  const [validationErrors, setValidationErrors] = React.useState<Partial<Record<keyof FormType, string>>>({});
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePhone = (phone: string) => {
    // Simple validation for demonstration
    return phone.trim().length >= 10;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field changes
    if (validationErrors[name as keyof FormType]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: Partial<Record<keyof FormType, string>> = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(values.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="contact@example.com"
            className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              validationErrors.email 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.email}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              validationErrors.phone 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          {validationErrors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.phone}
            </p>
          )}
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {initialValues.email || initialValues.phone ? 'Update Contact' : 'Create Contact'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
