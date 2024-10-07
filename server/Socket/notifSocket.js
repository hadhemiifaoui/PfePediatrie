
const { Server } = require('socket.io');

let io;
const users = {}; 

const initializeSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // When a client connects
  io.on('connection', (socket) => {
    console.log('user connecté:', socket.id);

    // Listen for the user to send their role (emit this from the frontend upon connection)
    socket.on('userConnected', (userData) => {
      users[socket.id] = userData; // Store user details by socket ID
      console.log('user data:', userData);
    });

    // When a notification is sent, only emit it to admins
    socket.on('sendNotification', (data) => {
      console.log('notification reçu:', data);

      // Send notification only to admin users
      for (let socketId in users) {
        if (users[socketId].role === 'admin') {
          io.to(socketId).emit('receiveNotification', data);
        }
      }
    });

    // When a client disconnects, remove them from the users object
    socket.on('disconnect', () => {
      delete users[socket.id]; // Remove user from the list when they disconnect
      console.log('user déconnecté:', socket.id);
    });
  });

  return io;
};

const getNotificationSocket = () => io;

module.exports = { initializeSocketServer, getNotificationSocket };
