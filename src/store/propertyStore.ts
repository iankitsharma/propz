import { create } from 'zustand';
import { Property, SearchFilters } from '../types';
import { getFromStorage, saveToStorage } from '../lib/supabase';
import toast from 'react-hot-toast';

interface PropertyStore {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  searchFilters: SearchFilters;
  fetchProperties: () => Promise<void>;
  addProperty: (property: Omit<Property, 'id' | 'created_at' | 'views' | 'inquiries'>) => Promise<void>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  setSearchFilters: (filters: SearchFilters) => void;
  searchProperties: (query: string) => void;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    user_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    title: 'Premium Agricultural Land - Nashik',
    listing_type: 'both',
    property_type: 'agricultural',
    location: {
      state: 'Maharashtra',
      district: 'Nashik',
      area: 'Dindori',
      address: 'Village Dindori, Nashik, Maharashtra 422202',
      coordinates: [19.5, 73.8]
    },
    size: 5,
    size_unit: 'acres',
    sale_price: 2500000,
    rent_price: 25000,
    lease_terms: {
      minimum_duration: '2 years',
      deposit_amount: 150000
    },
    legal_status: 'clear',
    infrastructure: {
      water: true,
      electricity: true,
      road_access: true
    },
    soil_type: 'Black cotton soil',
    images: ['https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg?auto=compress&cs=tinysrgb&w=800'],
    availability: 'Immediate',
    description: 'Fertile agricultural land perfect for grape cultivation with excellent water supply and road connectivity.',
    created_at: '2024-01-15T10:00:00Z',
    views: 234,
    inquiries: 12,
    status: 'active',
    featured: true
  },
  {
    id: 'b8e1c3a7-9d4f-4b2a-8c6e-1f2a3b4c5d6e',
    user_id: 'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
    title: 'Residential Plot - Pune Outskirts',
    listing_type: 'sale',
    property_type: 'residential',
    location: {
      state: 'Maharashtra',
      district: 'Pune',
      area: 'Talegaon',
      address: 'Talegaon Dabhade, Pune, Maharashtra 410507',
      coordinates: [18.7, 73.7]
    },
    size: 2400,
    size_unit: 'sqft',
    sale_price: 1200000,
    legal_status: 'clear',
    infrastructure: {
      water: true,
      electricity: false,
      road_access: true
    },
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'],
    availability: 'Immediate',
    description: 'Ready-to-build residential plot in upcoming area with good appreciation potential.',
    created_at: '2024-01-10T14:30:00Z',
    views: 156,
    inquiries: 8,
    status: 'active',
    featured: false
  }
];

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: mockProperties,
  filteredProperties: mockProperties,
  loading: false,
  searchFilters: {},

  fetchProperties: async (filters = {}) => {
    set({ loading: true });
    try {
      // Get properties from local storage or use mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to get from local storage first
      let storedProperties = getFromStorage('properties');
      
      // If not in storage, use mock data and save to storage
      if (!storedProperties) {
        storedProperties = mockProperties;
        saveToStorage('properties', mockProperties);
      }
      
      // Apply any filters
      let filtered = storedProperties;
      Object.entries(filters).forEach(([key, value]: [string, any]) => {
        if (!value) return;
        
        if (key === 'price_min') {
          filtered = filtered.filter((p: Property) => {
            const price = p.sale_price || p.rent_price || 0;
            return price >= value;
          });
        } else if (key === 'price_max') {
          filtered = filtered.filter((p: Property) => {
            const price = p.sale_price || p.rent_price || 0;
            return price <= value;
          });
        } else if (key === 'location') {
          filtered = filtered.filter((p: Property) => 
            p.location.state.toLowerCase().includes(value.toLowerCase()) ||
            p.location.district.toLowerCase().includes(value.toLowerCase()) ||
            p.location.area.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          filtered = filtered.filter((p: Property) => (p as any)[key] === value);
        }
      });
      
      set({
        properties: storedProperties,
        filteredProperties: filtered,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      console.error('Error fetching properties:', error);
    }
  },

  addProperty: async (propertyData) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProperty: Property = {
        ...propertyData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        views: 0,
        inquiries: 0
      };

      set(state => ({
        properties: [newProperty, ...state.properties],
        filteredProperties: [newProperty, ...state.filteredProperties],
        loading: false
      }));
      
      // Persist to localStorage
      saveToStorage('properties', [newProperty, ...get().properties]);
      toast.success('Property added successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProperty: async (id, updates) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update property in state
      const updatedProperties = get().properties.map(p => 
        p.id === id ? { ...p, ...updates } : p
      );

      set({
        properties: updatedProperties,
        filteredProperties: updatedProperties.filter(p => 
          get().filteredProperties.some(fp => fp.id === p.id)
        ),
        loading: false
      });
      
      // Persist to localStorage
      saveToStorage('properties', updatedProperties);
      toast.success('Property updated successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove property from state
      const updatedProperties = get().properties.filter(p => p.id !== id);

      set({
        properties: updatedProperties,
        filteredProperties: get().filteredProperties.filter(p => p.id !== id),
        loading: false
      });
      
      // Persist to localStorage
      saveToStorage('properties', updatedProperties);
      toast.success('Property deleted successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  setSearchFilters: (filters: SearchFilters) => {
    set({ searchFilters: filters });
    const { properties } = get();
    
    let filtered = properties;
    
    if (filters.transaction_type && filters.transaction_type !== 'both') {
      filtered = filtered.filter(p => 
        p.listing_type === filters.transaction_type || p.listing_type === 'both'
      );
    }
    
    if (filters.property_type) {
      filtered = filtered.filter(p => p.property_type === filters.property_type);
    }
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.state.toLowerCase().includes(filters.location!.toLowerCase()) ||
        p.location.district.toLowerCase().includes(filters.location!.toLowerCase()) ||
        p.location.area.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.price_min || filters.price_max) {
      filtered = filtered.filter(p => {
        const price = p.sale_price || p.rent_price || 0;
        return (!filters.price_min || price >= filters.price_min) &&
               (!filters.price_max || price <= filters.price_max);
      });
    }
    
    set({ filteredProperties: filtered });
  },

  searchProperties: (query) => {
    const { properties } = get();
    
    if (!query || !query.trim()) {
      set({ 
        filteredProperties: properties,
        searchFilters: {}
      });
      return;
    }
    
    const filtered = properties.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.state.toLowerCase().includes(query.toLowerCase()) ||
      p.location.district.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    set({ filteredProperties: filtered });
  }
}));