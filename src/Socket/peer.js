import Peer from 'peerjs';

const myPeer = new Peer(undefined, {
  host: 'localhost',
  port: 3001, 
  path: 'http://localhost:3001',  
});

export default myPeer;