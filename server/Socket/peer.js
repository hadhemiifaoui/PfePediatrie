const { PeerServer } = require('peer');

const server = PeerServer({
  port: 3001,  // The port on which the PeerJS server will listen
  path: '/myapp',  // The path used to route WebSocket connections
});

console.log('PeerJS server running on port 3001');
