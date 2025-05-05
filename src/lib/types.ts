import { AlertType } from './types';

// API Response Types
export interface Vendor {
  id: number;
  name: string;
}

export interface Tour {
  id: number;
  name: string;
  location: string;
}

export interface Ticket {
  id: number;
  vendorId: number;
  tourId: number;
  productName: string;
  listingType: 'new_listing' | 'multi_variant';
}

export interface CancellationPolicy {
  id: number;
  vendorId: number;
  tourId: number;
  status: 'ACTIVE' | 'INACTIVE';
  cancellationBeforeMinutes: number | null;
}

export interface Contact {
  id: number;
  vendorId: number;
  tourId: number;
  phone: string;
  email: string;
}

export interface VendorTour {
  id: number;
  vendorId: number;
  tourId: number;
  createdAt: string;
}

// API Error Response
export interface ApiError {
  message: string;
  status?: number;
}

// Form Types
export interface CancellationPolicyForm {
  status: 'ACTIVE' | 'INACTIVE';
  cancellationBeforeMinutes: number | null;
}

export interface ContactForm {
  phone: string;
  email: string;
}

// Alert Types
export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}