
/*import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
    transports: ['polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

*/

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const [socket , setSocket] = useState(null)
  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
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
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
