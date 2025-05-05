import { VendorTour } from './types';

const VENDOR_TOURS_KEY = 'vendorTours';

export const storage = {
  getVendorTours(): VendorTour[] {
    const data = localStorage.getItem(VENDOR_TOURS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getVendorTourByVendorAndTour(vendorId: number, tourId: number): VendorTour | null {
    const tours = this.getVendorTours();
    return tours.find(tour => tour.vendorId === vendorId && tour.tourId === tourId) || null;
  },

  createVendorTour(vendorId: number, tourId: number): VendorTour {
    const tours = this.getVendorTours();
    
    // Check if tour already exists
    const existingTour = tours.find(
      tour => tour.vendorId === vendorId && tour.tourId === tourId
    );
    
    if (existingTour) {
      return existingTour;
    }

    // Create new tour
    const newTour: VendorTour = {
      id: Date.now(),
      vendorId,
      tourId,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem(VENDOR_TOURS_KEY, JSON.stringify([...tours, newTour]));

    return newTour;
  }
};