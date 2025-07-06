import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { getErrorMessage, getFromStorage, saveToStorage } from '../lib/supabase';
import toast from 'react-hot-toast';

/**
 * Hook for working with local data
 * Provides common utility functions previously handled by Supabase
 */
export const useSupabase = () => {
  const { user, setLoading, updateUser } = useAuthStore();

  /**
   * Track user activity (view, favorite, inquiry) using local storage
   */
  const trackUserActivity = useCallback(async (
    propertyId: string,
    activityType: 'view' | 'favorite' | 'inquiry'
  ) => {
    if (!user?.id) return;

    try {
      const activities = getFromStorage('user_activities') || [];
      activities.push({
        id: crypto.randomUUID(),
        user_id: user.id,
        property_id: propertyId,
        activity_type: activityType,
        timestamp: new Date().toISOString()
      });
      saveToStorage('user_activities', activities);
    } catch (error) {
      console.error('Failed to track activity:', error);
    }
  }, [user]);

  /**
   * Update user preferences in local storage
   */
  const updateUserPreferences = useCallback(async (
    preferences: {
      max_price?: number;
      min_bedrooms?: number;
      preferred_locations?: any;
    }
  ) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const userPreferences = getFromStorage('user_preferences') || [];
      const existingIndex = userPreferences.findIndex((p: any) => p.user_id === user.id);
      
      if (existingIndex >= 0) {
        userPreferences[existingIndex] = {
          ...userPreferences[existingIndex],
          ...preferences,
          updated_at: new Date().toISOString()
        };
      } else {
        userPreferences.push({
          user_id: user.id,
          ...preferences,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      
      saveToStorage('user_preferences', userPreferences);
      
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  }, [user, setLoading]);

  /**
   * Get user preferences from local storage
   */
  const getUserPreferences = useCallback(async () => {
    if (!user?.id) return null;

    try {
      const userPreferences = getFromStorage('user_preferences') || [];
      const preferences = userPreferences.find((p: any) => p.user_id === user.id);
      
      return preferences || null;
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      return null;
    }
  }, [user]);

  /**
   * Get user's recent activity from local storage
   */
  const getUserActivity = useCallback(async (limit = 10) => {
    if (!user?.id) return [];

    try {
      const activities = getFromStorage('user_activities') || [];
      const properties = getFromStorage('properties') || [];
      
      // Filter activities for this user and sort by timestamp (descending)
      const userActivities = activities
        .filter((a: any) => a.user_id === user.id)
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit)
        .map((activity: any) => {
          // Add property details
          const property = properties.find((p: any) => p.id === activity.property_id);
          return {
            ...activity,
            properties: property ? {
              id: property.id,
              title: property.title,
              price: property.sale_price || property.rent_price,
              location: property.location,
              status: property.status
            } : null
          };
        });
      
      return userActivities;
    } catch (error) {
      console.error('Failed to get user activity:', error);
      return [];
    }
  }, [user]);

  /**
   * Update user profile in local storage
   */
  const updateProfile = useCallback(async (profileData: Partial<{
    full_name: string;
    profile_image_url: string;
    email: string;
  }>) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const users = getFromStorage('local_users') || [];
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...profileData,
        updated_at: new Date().toISOString()
      };
      
      saveToStorage('local_users', users);
      
      // Update local user state
      updateUser({
        name: profileData.full_name || user.name,
        email: profileData.email || user.email,
        profile_image: profileData.profile_image_url || user.profile_image
      });
      
      toast.success('Profile updated successfully');
      return users[userIndex];
    } catch (error) {
      toast.error('Failed to update profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, setLoading, updateUser]);

  return {
    trackUserActivity,
    updateUserPreferences,
    getUserPreferences,
    getUserActivity,
    updateProfile,
  };
};