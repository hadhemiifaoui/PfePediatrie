import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userid');
  
    if (token && role && userId) {
      setIsAuthenticated(true);
      setUserRole(role);
      fetchUserData(userId);
    }

    setLoading(false); 
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await userServices.getUserById(userId);
      setUser(response); 
    } catch (error) {
      console.error('error getting data:', error);
    }
  };

  const login = async (token, role, _id) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userid', _id);
    
    setIsAuthenticated(true);
    setUserRole(role);
    await fetchUserData(_id);

    if (role === 'admin') {
      navigate('/dashboard');
    } else if (role === 'patient') {
      navigate('/dashboard1');
    } else if (role === 'pediatre') {
      navigate('/accounte');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userid');

    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);

    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

