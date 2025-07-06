// Mock helper functions to replace Supabase client

// Helper function to simulate constraint errors
export const isUniqueConstraintError = (error: any): boolean => {
  return error?.code === '23505' || error?.message?.includes('unique constraint');
};

// Helper function to extract error messages
export const getErrorMessage = (error: any): string => {
  return error?.message || error?.error_description || 'An unknown error occurred';
};

// Helper function for consistent error handling
export const handleError = (error: any): string => {
  console.error('Error:', error);
  
  if (isUniqueConstraintError(error)) {
    return 'This record already exists. Please try a different one.';
  }
  
  return getErrorMessage(error);
};

// Local storage helpers
export const getFromStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return null;
  }
};

export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

export const removeFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};