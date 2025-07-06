import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '../types';
import { getFromStorage, saveToStorage } from '../lib/supabase';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          // Mock login using local storage
          await new Promise(resolve => setTimeout(resolve, 1000));

          const users = getFromStorage('local_users') || [];
          const user = users.find((u: any) => u.email === email);
          
          if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
          }
          
          // Update last login
          const updatedUser = {
            ...user,
            last_login: new Date().toISOString()
          };
          
          // Update the user in the storage
          const updatedUsers = users.map((u: any) => 
            u.email === email ? updatedUser : u
          );
          
          saveToStorage('local_users', updatedUsers);
          
          // Format user for store
          const storeUser: User = {
            id: updatedUser.id,
            email: updatedUser.email,
            phone: updatedUser.phone || '',
            name: updatedUser.full_name || 'User',
            role: updatedUser.role || 'seeker',
            subscription_tier: updatedUser.subscription_tier || 'free',
            verified: updatedUser.verified || false,
            created_at: updatedUser.created_at,
            location: updatedUser.location || ''
          };

          set({
            user: storeUser,
            token: 'mock-jwt-token',
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ loading: true });
        try {
          // Mock registration using local storage
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const users = getFromStorage('local_users') || [];
          
          // Check if user already exists
          if (users.some((u: any) => u.email === userData.email)) {
            throw new Error('User already exists');
          }
          
          // Create new user
          const newUser = {
            id: crypto.randomUUID(),
            email: userData.email,
            password: 'password123', // In a real app, this would be hashed
            full_name: userData.name,
            role: userData.role,
            phone: userData.phone,
            subscription_tier: 'free',
            verified: true,
            created_at: new Date().toISOString()
          };
          
          users.push(newUser);
          saveToStorage('local_users', users);
          
          // Format user for store
          const storeUser: User = {
            id: newUser.id,
            email: newUser.email,
            phone: newUser.phone || '',
            name: newUser.full_name,
            role: newUser.role,
            subscription_tier: 'free',
            verified: true,
            created_at: newUser.created_at,
            location: userData.location || ''
          };

          set({
            user: storeUser,
            token: 'mock-jwt-token',
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        // Could also clear specific local storage items if needed
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user, isAuthenticated } = get();
        if (user) {
          // Update in local storage if authenticated
          if (isAuthenticated) {
            const users = getFromStorage('local_users') || [];
            const updatedUsers = users.map((u: any) => 
              u.id === user.id ? { ...u, ...userData } : u
            );
            saveToStorage('local_users', updatedUsers);
          }
          
          // Update in store
          set({ user: { ...user, ...userData } });
        }
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);