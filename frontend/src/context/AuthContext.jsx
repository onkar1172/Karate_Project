import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, userApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('karate_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('karate_token') || null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('karate_token', token);
      localStorage.setItem('karate_user', JSON.stringify(userData));
      
      setToken(token);
      setUser(userData);
      showToast(`Welcome back, ${userData.fullName}!`, 'success');
      return { success: true, user: userData };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (fullName, email, password, phone, role = 'user') => {
    setLoading(true);
    try {
      await authApi.signup({
        fullName,
        email,
        password,
        phone,
        roles: [role]
      });
      showToast('Registration successful! You can now log in.', 'success');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed. Email might already be taken.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('karate_token');
    localStorage.removeItem('karate_user');
    setToken(null);
    setUser(null);
    showToast('You have been logged out.', 'info');
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await userApi.getProfile();
      setUser((prev) => {
        const updated = { ...prev, ...res.data };
        localStorage.setItem('karate_user', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  };

  const updateUserState = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('karate_user', JSON.stringify(updated));
      return updated;
    });
  };

  const isAdmin = user?.roles?.includes('ROLE_ADMIN') || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
        updateUserState,
        showToast,
        toast,
        setToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
