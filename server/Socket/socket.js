// File: Socket/videoConsultationSocket.js
const { Server } = require('socket.io');
const { v4: uuidV4 } = require('uuid');

const initializeVideoConsultationSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  const videoNamespace = io.of('/video'); 

  videoNamespace.on('connection', (socket) => {
    console.log('New client connected to video namespace:', socket.id);

    socket.on('create-room', (callback) => {
      const newRoomId = uuidV4();
      callback(newRoomId);
      console.log(`Room created with ID: ${newRoomId}`);
    });

    socket.on('initiate-call', ({ roomId, callerName }) => {
      videoNamespace.to(roomId).emit('incoming-call', { callerName, roomId });
    });

    socket.on('join-room', (roomId, userId) => {
      console.log(`${userId} joined room: ${roomId}`);
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', userId);

      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId);
        console.log(`${userId} disconnected from room: ${roomId}`);
      });
    });

    socket.on('signal', (data) => {
      const { roomId, signal } = data;
      console.log(`Signal received from room ${roomId}:`, signal);
      videoNamespace.to(roomId).emit('signal', signal);
    });

    socket.on('accept-call', (roomId) => {
      videoNamespace.to(roomId).emit('call-accepted');
    });

    socket.on('reject-call', (roomId) => {
      videoNamespace.to(roomId).emit('call-rejected');
    });
  });

  return io;
};

module.exports = initializeVideoConsultationSocket;
