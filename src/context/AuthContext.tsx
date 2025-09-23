import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on load
    const storedUser = localStorage.getItem('civicIssueUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('civicIssueUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, selectedRole?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication - in real app, this would be an API call
    let authenticatedUser = mockUsers.find(u => u.email === email);
    
    // If role is specified, use the selected role for demo purposes
    if (selectedRole && !authenticatedUser) {
      // Create a demo user with the selected role
      authenticatedUser = {
        id: 'DEMO001',
        name: 'Demo User',
        email: email,
        role: selectedRole as any,
        phone: '+91-9431234567',
        lastLogin: new Date().toISOString(),
        department: selectedRole === 'Department Admin' ? 'PWD001' : undefined,
      };
    }
    
    if (authenticatedUser) {
      const userWithUpdatedLogin = {
        ...authenticatedUser,
        lastLogin: new Date().toISOString()
      };
      
      setUser(userWithUpdatedLogin);
      localStorage.setItem('civicIssueUser', JSON.stringify(userWithUpdatedLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicIssueUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};