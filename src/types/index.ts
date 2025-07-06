// User Types
export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'seeker' | 'owner' | 'broker' | 'professional';
  subscription_tier: 'free' | 'seeker_premium' | 'seller_premium' | 'professional';
  verified: boolean;
  profile_image?: string;
  created_at: string;
  location?: string;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  limits: {
    requirements?: number;
    properties?: number;
    contacts?: number;
    messaging?: boolean;
    featured_listings?: number;
  };
}

// Property Types
export interface Property {
  id: string;
  user_id: string;
  title: string;
  listing_type: 'sale' | 'rent' | 'both';
  property_type: 'agricultural' | 'residential' | 'commercial' | 'industrial';
  location: {
    state: string;
    district: string;
    area: string;
    address: string;
    coordinates?: [number, number];
  };
  size: number;
  size_unit: 'acres' | 'sqft' | 'hectares';
  sale_price?: number;
  rent_price?: number;
  lease_terms?: {
    minimum_duration: string;
    deposit_amount: number;
  };
  legal_status: 'clear' | 'disputed' | 'under_loan';
  infrastructure: {
    water: boolean;
    electricity: boolean;
    road_access: boolean;
  };
  soil_type?: string;
  images: string[];
  documents?: string[];
  availability: string;
  description: string;
  created_at: string;
  views: number;
  inquiries: number;
  status: 'active' | 'sold' | 'rented' | 'inactive';
  featured: boolean;
}

// Requirement Types
export interface Requirement {
  id: string;
  user_id: string;
  transaction_type: 'buy' | 'rent' | 'lease';
  land_type: 'agricultural' | 'residential' | 'commercial' | 'industrial';
  purpose: string;
  location: {
    state: string;
    district: string;
    area?: string;
  };
  size_range: {
    min: number;
    max: number;
    unit: 'acres' | 'sqft' | 'hectares';
  };
  budget_range?: {
    min: number;
    max: number;
  };
  rent_budget?: {
    min: number;
    max: number;
    duration: 'monthly' | 'yearly';
  };
  lease_duration?: string;
  timeline: string;
  specific_needs: string[];
  soil_type?: string;
  description: string;
  created_at: string;
  responses: number;
  status: 'active' | 'fulfilled' | 'closed';
}

// Message Types
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  property_id?: string;
  requirement_id?: string;
  content: string;
  message_type: 'text' | 'image' | 'document' | 'location';
  created_at: string;
  read: boolean;
}

// Search Filters
export interface SearchFilters {
  transaction_type?: 'buy' | 'rent' | 'both';
  property_type?: string;
  location?: string;
  size_min?: number;
  size_max?: number;
  price_min?: number;
  price_max?: number;
  rent_min?: number;
  rent_max?: number;
  infrastructure?: string[];
  soil_type?: string;
  legal_status?: string;
}