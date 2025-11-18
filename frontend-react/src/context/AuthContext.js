// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { saveToken, saveUser, clearAuthStorage, getUser, getToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // 1. Cek Login saat aplikasi dimuat (Initial Load)
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const storedUser = getUser();

      if (token && storedUser) {
        setUser(storedUser); // Restore user dari localStorage
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // 2. Fungsi Login yang DIPERBAIKI
  const login = (userData, token) => {
    // Simpan ke LocalStorage
    saveToken(token);
    saveUser(userData);
    
    // UPDATE STATE LANGSUNG (Penting agar UI berubah tanpa refresh)
    setUser(userData); 
  };

  // 3. Fungsi Logout
  const logout = () => {
    clearAuthStorage();
    setUser(null);
    window.location.href = '/login'; // Redirect paksa untuk bersih-bersih state
  };

  // 4. Update User State (misal setelah ganti foto/nama)
  const updateUserState = (updatedData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };
      saveUser(newUser); // Sinkronkan ke localStorage
      return newUser;
    });
  };

  // Theme handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Apply theme on load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      theme, 
      toggleTheme,
      updateUserState 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;