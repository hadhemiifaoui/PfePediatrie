
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
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userid');
     
    if (token && role && userId) {
      setIsAuthenticated(true);
      setUserRole(role);
      fetchUserData(userId); 
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await userServices.getUserById(userId);
      setUser(response); 
    } catch (error) {
      console.error('erreur ,', error);
    }
  };

  const login = async (token, role, _id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userid', _id);

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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');

    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


/*import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [childId, setChildId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userid');
    const storedChildId = localStorage.getItem('childId'); // Retrieve stored child ID

    if (token && role && userId) {
      setIsAuthenticated(true);
      setUserRole(role);
      fetchUserData(userId); // Fetch user data from the backend

      if (storedChildId) {
        setChildId(storedChildId); // Restore child ID from local storage
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await userServices.getUserById(userId);
      setUser(response);

      if (response.role === 'parent' && response.child) {
        setChildId(response.child._id); // Set the child ID in state
        localStorage.setItem('childId', response.child._id); // Store child ID in local storage
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (token, role, _id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userid', _id);

    setIsAuthenticated(true);
    setUserRole(role);

    await fetchUserData(_id);

    // Navigate based on user role
    if (role === 'admin') {
      navigate('/dashboard');
    } else if (role === 'patient') {
      navigate('/dashboard1');
    } else if (role === 'pediatre') {
      navigate('/accounte');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('childId');

    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    setChildId(null); 

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, childId, setUser, setChildId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;*/
