import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentSession, 
  loginUser, 
  logoutUser, 
  registerWarga, 
  initSeedUsers 
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      await initSeedUsers();
      const session = getCurrentSession();
      if (session && session.user) {
        setCurrentUser(session.user);
      }
      setLoading(false);
    }
    loadSession();
  }, []);

  const login = async (identifier, password) => {
    const user = await loginUser(identifier, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (formData) => {
    const newWarga = await registerWarga(formData);
    return newWarga;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user: currentUser,
      isAuthenticated: !!currentUser,
      role: currentUser?.role || null,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}

