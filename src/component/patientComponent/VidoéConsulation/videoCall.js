/*import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs'; 
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import consultationservices from '../../../services/videoConsultationServices'; 
import './video.css';

const VideoConsultation = () => {
  const videoGrid = useRef(null);
  const myVideo = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const socketRef = useRef(null);
  const peers = useRef({});
  const myPeer = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    if (!isConnected) return;

    const initializeStream = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: cameraEnabled,
          audio: !micMuted,
        });
        myVideo.current.srcObject = localStream.current;

        myPeer.current = new Peer(undefined, {
          host: 'localhost',
          port: 3001,
          path: '/myapp',
        });

        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('join-room', roomId);

        myPeer.current.on('call', (call) => {
          call.answer(localStream.current);
          const video = document.createElement('video');
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socketRef.current.on('user-connected', (userId) => {
          connectToNewUser(userId, localStream.current);
        });

        socketRef.current.on('user-disconnected', (userId) => {
          if (peers.current[userId]) peers.current[userId].close();
        });
      } catch (err) {
        console.error('Failed to get media stream', err);
      }
    };

    const connectToNewUser = (userId, stream) => {
      const call = myPeer.current.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on('close', () => {
        video.remove();
      });
      peers.current[userId] = call;
    };

    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGrid.current.append(video);
    };

    initializeStream();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      Object.values(peers.current).forEach((peer) => peer.close());
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnected, roomId, micMuted, cameraEnabled]);

  const joinConsultation = async () => {
    if (!roomId) {
      alert('Please enter a valid Room ID');
      return;
    }

    try {
      const response = await consultationservices.joinConsultationVideo(roomId);
      setRoomId(response.roomId);
      setIsConnected(true);
      console.log('Joined consultation:', response);
    } catch (err) {
      console.error('Error joining consultation:', err);
    }
  };

  const toggleMic = () => {
    setMicMuted(!micMuted);
    localStream.current.getAudioTracks().forEach(track => {
      track.enabled = !micMuted;
    });
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
    localStream.current.getVideoTracks().forEach(track => {
      track.enabled = !cameraEnabled;
    });
  };

  return (
    <div>
      <h2>Video Consultation</h2>
      <input 
        type="text" 
        value={roomId} 
        onChange={(e) => setRoomId(e.target.value)} 
        placeholder="Enter Room ID" 
      />
      <Button onClick={joinConsultation} color="primary" variant="contained">
        <PhoneIcon />
      </Button>
      <div ref={videoGrid} className="video-grid">
        <video ref={myVideo} playsInline muted autoPlay className="video-player" />
      </div>
      <div className="controls">
        <Tooltip title={micMuted ? "Unmute" : "Mute"}>
          <Button onClick={toggleMic}>
            {micMuted ? <MicOffIcon /> : <MicIcon />}
          </Button>
        </Tooltip>
        <Tooltip title={cameraEnabled ? "Turn Camera Off" : "Turn Camera On"}>
          <Button onClick={toggleCamera}>
            {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </Button>
        </Tooltip>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Room ID copied to clipboard!"
      />
    </div>
  );
};

export default VideoConsultation;
*/
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import consultationservices from '../../../services/videoConsultationServices';
import './video.css';

const VideoConsultation = () => {
  const videoGrid = useRef(null);
  const myVideo = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showRoomIdInput, setShowRoomIdInput] = useState(true);
  
  const socketRef = useRef(null);
  const peers = useRef({});
  const myPeer = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    if (!isConnected) return;

    const initializeStream = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: cameraEnabled,
          audio: !micMuted,
        });
        myVideo.current.srcObject = localStream.current;

        myPeer.current = new Peer(undefined, {
          host: 'localhost',
          port: 3001,
          path: '/myapp',
        });

        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('join-room', roomId);

        myPeer.current.on('call', (call) => {
          call.answer(localStream.current);
          const video = document.createElement('video');
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socketRef.current.on('user-connected', (userId) => {
          connectToNewUser(userId, localStream.current);
        });

        socketRef.current.on('user-disconnected', (userId) => {
          if (peers.current[userId]) peers.current[userId].close();
        });
      } catch (err) {
        console.error('Failed to get media stream', err);
      }
    };

    const connectToNewUser = (userId, stream) => {
      const call = myPeer.current.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on('close', () => {
        video.remove();
      });
      peers.current[userId] = call;
    };

    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGrid.current.append(video);
    };

    if (isConnected) {
      initializeStream();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      Object.values(peers.current).forEach((peer) => peer.close());
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnected, roomId, micMuted, cameraEnabled]);

  const joinConsultation = async () => {
    if (!roomId) {
      setSnackbarMessage('Please enter a valid Room ID');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await consultationservices.joinConsultationVideo(roomId);
      if (response.success) {
        setShowRoomIdInput(false);
        setIsConnected(true);
        setSnackbarMessage('Joined consultation successfully!');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Invalid Room ID. Please check and try again.');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error joining consultation:', err);
      setSnackbarMessage('Error joining consultation. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const toggleMic = () => {
    setMicMuted(prev => !prev);
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach(track => track.enabled = !micMuted);
    }
  };

  const toggleCamera = () => {
    setCameraEnabled(prev => !prev);
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach(track => track.enabled = !cameraEnabled);
    }
  };

  const leaveConsultation = () => {
    setIsConnected(false);
    setShowRoomIdInput(true);
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    Object.values(peers.current).forEach((peer) => peer.close());
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }
    setSnackbarMessage('Left the consultation.');
    setSnackbarOpen(true);
  };

  return (
    <div>
      {showRoomIdInput ? (
        <div id="room-id-container">
          <h2>Enter Room ID</h2>
          <input 
            type="text" 
            value={roomId} 
            onChange={(e) => setRoomId(e.target.value)} 
            placeholder="Room ID" 
          />
          <Button variant="contained" onClick={joinConsultation}>Join Room</Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity="info"
          />
        </div>
      ) : (
        <div>
          <div id="video-grid" ref={videoGrid}></div>
          <div className="controls">
            <Tooltip title={micMuted ? "Unmute" : "Mute"}>
              <Button onClick={toggleMic}>
                {micMuted ? <MicOffIcon /> : <MicIcon />}
              </Button>
            </Tooltip>
            <Tooltip title={cameraEnabled ? "Turn Off Camera" : "Turn On Camera"}>
              <Button onClick={toggleCamera}>
                {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              </Button>
            </Tooltip>
            <Button variant="contained" onClick={leaveConsultation}>
              <CallEndIcon />
            </Button>
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            severity="info"
          />
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
