import { create } from 'zustand';
import { Requirement } from '../types';
import { getFromStorage, saveToStorage } from '../lib/supabase';
import toast from 'react-hot-toast';

interface RequirementStore {
  requirements: Requirement[];
  filteredRequirements: Requirement[];
  loading: boolean;
  fetchRequirements: () => Promise<void>;
  addRequirement: (requirement: Omit<Requirement, 'id' | 'created_at' | 'responses'>) => Promise<void>;
  updateRequirement: (id: string, updates: Partial<Requirement>) => Promise<void>;
  deleteRequirement: (id: string) => Promise<void>;
  searchRequirements: (query: string) => void;
}

// Mock data
const mockRequirements: Requirement[] = [
  {
    id: '1',
    user_id: '1',
    transaction_type: 'buy',
    land_type: 'agricultural',
    purpose: 'Looking for Agricultural Land for Organic Farming',
    location: {
      state: 'Karnataka',
      district: 'Bangalore Rural',
      area: 'Within 100km of Bangalore'
    },
    size_range: {
      min: 10,
      max: 20,
      unit: 'acres'
    },
    budget_range: {
      min: 5000000,
      max: 10000000
    },
    timeline: '3 months',
    specific_needs: ['Water Access', 'Organic Certification Possible', 'Good Soil Quality'],
    description: 'Looking for fertile agricultural land suitable for organic farming. Prefer land with existing water source and good road connectivity.',
    created_at: '2024-01-20T10:00:00Z',
    responses: 12,
    status: 'active'
  },
  {
    id: '2',
    user_id: '2',
    transaction_type: 'buy',
    land_type: 'residential',
    purpose: 'Need Residential Plot for Villa Construction',
    location: {
      state: 'Karnataka',
      district: 'Bangalore Urban',
      area: 'North Bangalore'
    },
    size_range: {
      min: 2000,
      max: 3000,
      unit: 'sqft'
    },
    budget_range: {
      min: 8000000,
      max: 12000000
    },
    timeline: 'Immediate',
    specific_needs: ['Clear Title', 'BMRDA Approved', 'Gated Community'],
    description: 'Looking for a residential plot in a well-developed area with all amenities nearby.',
    created_at: '2024-01-18T14:30:00Z',
    responses: 8,
    status: 'active'
  },
  {
    id: '3',
    user_id: '3',
    transaction_type: 'rent',
    land_type: 'commercial',
    purpose: 'Commercial Land for Warehouse Setup',
    location: {
      state: 'Karnataka',
      district: 'Bangalore Urban',
      area: 'Electronic City'
    },
    size_range: {
      min: 2,
      max: 5,
      unit: 'acres'
    },
    rent_budget: {
      min: 30000,
      max: 60000,
      duration: 'monthly'
    },
    lease_duration: 'Minimum 5 years',
    timeline: '2 months',
    specific_needs: ['Highway Access', 'Industrial Zone', '24/7 Power Supply'],
    description: 'Need commercial land for setting up a logistics warehouse with good connectivity to major highways.',
    created_at: '2024-01-15T09:15:00Z',
    responses: 15,
    status: 'active'
  }
];

export const useRequirementStore = create<RequirementStore>((set, get) => ({
  requirements: mockRequirements,
  filteredRequirements: mockRequirements,
  loading: false,

  fetchRequirements: async () => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load from localStorage or fallback to mock data
      const storedRequirements = getFromStorage('requirements');
      const requirements = storedRequirements || mockRequirements;
      
      // Save mock data to storage if none exists
      if (!storedRequirements) {
        saveToStorage('requirements', mockRequirements);
      }
      
      set({ 
        requirements: requirements,
        filteredRequirements: requirements,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  addRequirement: async (requirementData) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequirement: Requirement = {
        ...requirementData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        responses: 0
      };

      set(state => ({
        requirements: [newRequirement, ...state.requirements],
        filteredRequirements: [newRequirement, ...state.filteredRequirements],
        loading: false
      }));
      
      // Persist to localStorage for demo purposes
      saveToStorage('requirements', [newRequirement, ...get().requirements]);
      toast.success('Requirement added successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateRequirement: async (id, updates) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update in state
      const updatedRequirements = get().requirements.map(r => 
        r.id === id ? { ...r, ...updates } : r
      );
      
      set({
        requirements: updatedRequirements,
        filteredRequirements: get().filteredRequirements.map(r => 
          r.id === id ? { ...r, ...updates } : r
        ),
        loading: false
      });
      
      // Save to localStorage
      saveToStorage('requirements', updatedRequirements);
      toast.success('Requirement updated successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteRequirement: async (id) => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update state
      const updatedRequirements = get().requirements.filter(r => r.id !== id);
      
      set({
        requirements: updatedRequirements,
        filteredRequirements: get().filteredRequirements.filter(r => r.id !== id),
        loading: false
      });
      
      // Save to localStorage
      saveToStorage('requirements', updatedRequirements);
      toast.success('Requirement deleted successfully!');
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  searchRequirements: (query) => {
    const { requirements } = get();
    if (!query.trim()) {
      set({ filteredRequirements: requirements });
      return;
    }
    
    const filtered = requirements.filter(r =>
      r.purpose.toLowerCase().includes(query.toLowerCase()) ||
      r.location.state.toLowerCase().includes(query.toLowerCase()) ||
      r.location.district.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase())
    );
    
    set({ filteredRequirements: filtered });
  }
}));