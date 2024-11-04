import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../component/authentification/AuthContext'; 

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const [socket, setSocket] = useState(null);
  const { user } = useAuth() || {}; // Safeguard against undefined context

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      if (user) {
        // Emit user role upon connection
        socketRef.current.emit('userConnected', { id: user._id, role: user.role });
      }
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    setSocket(socketRef.current);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(); 
        console.log('Disconnected from server');
      }
    };
  }, [user]); // Adding user to the dependency array

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};