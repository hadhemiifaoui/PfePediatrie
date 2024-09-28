/*const socketIo = require('socket.io');

let io; 

const initializeNotificationSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST", "PATCH", "DELETE"],
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('sendNotification', (data) => {
      io.emit('receiveNotification', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io; 
};

const getNotificationSocket = () => io;

module.exports = { initializeNotificationSocket, getNotificationSocket };
*/


// socketServer.js



const { Server } = require('socket.io');

let io; 

const initializeSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
   // perMessageDeflate: false,
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('sendNotification', (data) => {
      console.log('Notification received:', data); 
      io.emit('receiveNotification', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  return io;
};

const getNotificationSocket = () => io;

module.exports = { initializeSocketServer, getNotificationSocket };
