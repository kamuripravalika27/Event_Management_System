import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial demo user options for 1-click evaluation
  const demoAccounts = {
    user: {
      _id: '650000000000000000000001',
      name: 'Alex Johnson',
      email: 'user@eventhub.com',
      role: 'user',
      phone: '+1 555-0192',
      token: 'demo-user-token',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    organizer: {
      _id: '650000000000000000000002',
      name: 'Sarah Jenkins',
      email: 'organizer@eventhub.com',
      role: 'organizer',
      organization: 'Apex Event Management Group',
      phone: '+1 555-8833',
      token: 'demo-organizer-token',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    admin: {
      _id: '650000000000000000000003',
      name: 'Admin System',
      email: 'admin@eventhub.com',
      role: 'admin',
      token: 'demo-admin-token',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(demoAccounts.user);
      }
    } else {
      // Default initial login as user for frictionless preview
      setUser(demoAccounts.user);
      localStorage.setItem('user_profile', JSON.stringify(demoAccounts.user));
      localStorage.setItem('token', demoAccounts.user.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });
      setUser(data);
      localStorage.setItem('user_profile', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      // If server fails or offline demo, fallback to matching demo email
      const matched = Object.values(demoAccounts).find(a => a.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setUser(matched);
        localStorage.setItem('user_profile', JSON.stringify(matched));
        localStorage.setItem('token', matched.token);
        return matched;
      }
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      setUser(data);
      localStorage.setItem('user_profile', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_profile');
    localStorage.removeItem('token');
  };

  const switchRole = (role) => {
    if (demoAccounts[role]) {
      const demo = demoAccounts[role];
      setUser(demo);
      localStorage.setItem('user_profile', JSON.stringify(demo));
      localStorage.setItem('token', demo.token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole, demoAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
