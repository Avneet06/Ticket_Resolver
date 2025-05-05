import { 
  Vendor, 
  Tour, 
  Ticket, 
  CancellationPolicy, 
  Contact,
  VendorTour,
  CancellationPolicyForm, 
  ContactForm,
  ApiError 
} from './types';

const API_BASE_URL = 'https://my-json-server.typicode.com/neelbakshi94/test-plc';

// Generic fetch function with error handling
async function fetchApi<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: object
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || `API Error: ${response.status} ${response.statusText}`,
        status: response.status
      };
    }
    
    return await response.json();
  } catch (error) {
    if ((error as ApiError).message) {
      throw error;
    }
    throw {
      message: `Network error: ${(error as Error).message || 'Unknown error'}`,
    };
  }
}

// API endpoints
export const api = {
  // Vendors
  getVendors: () => fetchApi<Vendor[]>('/vendors'),
  getVendorById: (id: number) => fetchApi<Vendor>(`/vendors/${id}`),
  
  // Tours
  getTours: () => fetchApi<Tour[]>('/tours'),
  getTourById: (id: number) => fetchApi<Tour>(`/tours/${id}`),
  
  // Tickets
  getTickets: () => fetchApi<Ticket[]>('/tickets'),
  getTicketById: (id: number) => fetchApi<Ticket>(`/tickets/${id}`),
  
  // Cancellation Policies
  getCancellationPolicies: () => fetchApi<CancellationPolicy[]>('/cancellationPolicy'),
  getCancellationPolicyByVendorAndTour: (vendorId: number, tourId: number) => 
    fetchApi<CancellationPolicy[]>(`/cancellationPolicy?vendorId=${vendorId}&tourId=${tourId}`),
  updateCancellationPolicy: (id: number, data: CancellationPolicyForm) => 
    fetchApi<CancellationPolicy>(`/cancellationPolicy/${id}`, 'PUT', data),
  createCancellationPolicy: (data: Omit<CancellationPolicy, 'id'>) => 
    fetchApi<CancellationPolicy>('/cancellationPolicy', 'POST', data),
  
  // Contacts
  getContacts: () => fetchApi<Contact[]>('/contact'),
  getContactByVendorAndTour: (vendorId: number, tourId: number) => 
    fetchApi<Contact[]>(`/contact?vendorId=${vendorId}&tourId=${tourId}`),
  updateContact: (id: number, data: ContactForm) => 
    fetchApi<Contact>(`/contact/${id}`, 'PUT', data),
  createContact: (data: Omit<Contact, 'id'>) => 
    fetchApi<Contact>('/contact', 'POST', data),

  // Vendor Tours
  getVendorTourByVendorAndTour: (vendorId: number, tourId: number) =>
    fetchApi<VendorTour[]>(`/vendorTours?vendorId=${vendorId}&tourId=${tourId}`),
  createVendorTour: (data: Omit<VendorTour, 'id' | 'createdAt'>) =>
    fetchApi<VendorTour>('/vendorTours', 'POST', {
      ...data,
      createdAt: new Date().toISOString()
    })
};