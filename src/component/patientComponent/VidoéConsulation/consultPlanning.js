/*import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import userServices from '../../../services/userServices';
import consultationservices from '../../../services/videoConsultationServices'; 

const DemandeConsultation = () => {
  const [roomId, setRoomId] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [snackbarType, setSnackbarType] = useState('success');
  const [consultation , setConsultaion] = useState([])
  const pedId = localStorage.getItem('userid'); 
  
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await userServices.getChildernUnderPedAssistance(pedId);
        if (response.success && Array.isArray(response.children)) {
          setChildren(response.children);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching children:', error);
        setSnackbarType('error');
        setSnackbarMessage('Failed to fetch children.');
        setSnackbarOpen(true);
      }
    };

    fetchChildren();
  }, [pedId]);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    setRoomId(newRoomId);
  };

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  const createConsultation = async () => {
    if (!selectedChild) {
      setSnackbarType('error');
      setSnackbarMessage('Please select a child to create a consultation.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await consultationservices.create({
        pediatreId: pedId, 
        childId: selectedChild, 
        dateTime: selectedDate.toISOString(),
        roomId
      });
      setConsultaion(response)
      setSnackbarMessage("done done")
      console.log('done !!')
    } catch (error) {
      console.error('Error creating consultation:', error);
      setSnackbarType('error');
      setSnackbarMessage('Failed to create consultation. Please try again.');
    }
    
    setSnackbarOpen(true);
  };

  return (
    <div>
      <h2>Planning Consultation</h2>
      {roomId ? (
        <div>
          <p>Room ID: {roomId}</p>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Consultation Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <EventIcon />,
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ margin: '10px 0' }}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl fullWidth variant="outlined" style={{ margin: '10px 0' }}>
            <InputLabel>Select Child</InputLabel>
            <Select
              value={selectedChild}
              onChange={handleChildChange}
              label="Select Child"
            >
              {children.map((child) => (
                <MenuItem key={child._id} value={child._id}>
                  {child.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={createConsultation}
            disabled={!selectedChild}
          >
            Create Consultation
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={createRoom}>
          Create New Room
        </Button>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarType}
      />
    </div>
  );
};

export default DemandeConsultation;
*/

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import userServices from '../../../services/userServices';
import consultationservices from '../../../services/videoConsultationServices';

const DemandeConsultation = () => {
  const [roomId, setRoomId] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [snackbarType, setSnackbarType] = useState('success');
  const pedId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await userServices.getChildernUnderPedAssistance(pedId);
        if (response.success && Array.isArray(response.children)) {
          setChildren(response.children);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching children:', error);
        setSnackbarType('error');
        setSnackbarMessage('Failed to fetch children.');
        setSnackbarOpen(true);
      }
    };

    fetchChildren();
  }, [pedId]);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    setRoomId(newRoomId);
  };

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  const createConsultation = async () => {
    if (!selectedChild) {
      setSnackbarType('error');
      setSnackbarMessage('Please select a child to create a consultation.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await consultationservices.create({
        pediatreId: pedId,
        childId: selectedChild,
        dateTime: selectedDate.toISOString(),
        roomId
      });
      setSnackbarMessage("Consultation created successfully!");
      console.log('Consultation created:', response);
    } catch (error) {
      console.error('Error creating consultation:', error);
      setSnackbarType('error');
      setSnackbarMessage('Failed to create consultation. Please try again.');
    }
    
    setSnackbarOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        setSnackbarMessage('Room ID copied to clipboard!');
        setSnackbarType('success');
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackbarMessage('Failed to copy Room ID.');
        setSnackbarType('error');
        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      <h2>Planning Consultation</h2>
      {roomId ? (
        <div>
          <p>Room ID: {roomId}</p>
          <Button variant="contained" onClick={copyToClipboard}>
            Copy Room ID
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Consultation Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <EventIcon />,
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ margin: '10px 0' }}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl fullWidth variant="outlined" style={{ margin: '10px 0' }}>
            <InputLabel>Select Child</InputLabel>
            <Select
              value={selectedChild}
              onChange={handleChildChange}
              label="Select Child"
            >
              {children.map((child) => (
                <MenuItem key={child._id} value={child._id}>
                  {child.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={createConsultation}
            disabled={!selectedChild}
          >
            Create Consultation
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={createRoom}>
          Create New Room
        </Button>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarType}
      />
    </div>
  );
};

export default DemandeConsultation;
