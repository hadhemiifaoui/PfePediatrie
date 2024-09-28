import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Snackbar, Alert, Button, List, ListItem, ListItemText, Typography, Box, Paper, IconButton } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import './parameter.css';

const Parametre = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [backups, setBackups] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/backup/list');
        setBackups(response.data.backups);
      } catch (error) {
        setMessage('Error fetching backups: ' + error.message);
        setOpenSnackbar(true);
      }
    };
    fetchBackups();
  }, []);

  const handleBackup = async () => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      const response = await axios.get('http://localhost:3001/backup/');
      setSuccessMessage('Backup created successfully!');
      setOpenSnackbar(true);
      const listResponse = await axios.get('http://localhost:3001/backup/list');
      setBackups(listResponse.data.backups); 
    } catch (error) {
      setMessage('Error creating backup: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      await axios.post('http://localhost:3001/backup/restore');
      setSuccessMessage('Backup restored successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Error restoring backup: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (backupName) => {
    const downloadUrl = `http://localhost:3001/backup/download/${backupName}`;
    window.open(downloadUrl, '_blank'); 
  };

  const handleDelete = async (backupName) => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      await axios.delete(`http://localhost:3001/backup/backups/delete/${backupName}`);
      setSuccessMessage('Backup deleted successfully!');
      setOpenSnackbar(true);
      const listResponse = await axios.get('http://localhost:3001/backup/list');
      setBackups(listResponse.data.backups); 
    } catch (error) {
      setMessage('Error deleting backup: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatBackupName = (backup) => {
    const date = new Date(backup);
    if (!isNaN(date.getTime())) {
      return `Backup from ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return backup;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Paramètres
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleBackup}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <BackupIcon />}
        >
          {loading ? 'Creating Backup...' : 'Create Backup'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleRestore}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <RestoreIcon />}
        >
          {loading ? 'Restoring Backup...' : 'Restore Backup'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Available Backups:
      </Typography>
      {backups.length === 0 ? (
        <Typography>No backups available</Typography>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography>Liste des Sauvegardes</Typography>
          <List>
            {backups.map((backup, index) => (
              <ListItem 
                key={index} 
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleDownload(backup)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(backup)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={formatBackupName(backup)} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical:"top" , horizontal:"right"}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {message || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Parametre;





/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Snackbar, Alert, Button, List, ListItem, ListItemText, Typography, Box, Paper, IconButton } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import DownloadIcon from '@mui/icons-material/Download';
import './parameter.css';

const Parametre = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [backups, setBackups] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/backup/list');
        setBackups(response.data.backups);
      } catch (error) {
        setMessage('Error fetching backups: ' + error.message);
        setOpenSnackbar(true);
      }
    };
    fetchBackups();
  }, []);

  const handleBackup = async () => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      const response = await axios.get('http://localhost:3001/backup/');
      setSuccessMessage('Backup created successfully!');
      setOpenSnackbar(true);
      const listResponse = await axios.get('http://localhost:3001/backup/list');
      setBackups(listResponse.data.backups); 
    } catch (error) {
      setMessage('Error creating backup: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      await axios.post('http://localhost:3001/backup/restore');
      setSuccessMessage('Backup restored successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Error restoring backup: ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDownload = (backupName) => {
    const downloadUrl = `http://localhost:3001/backup/download/${backupName}`;
    window.open(downloadUrl, '_blank'); // This will open the download in a new tab
  };

  const formatBackupName = (backup) => {
    const date = new Date(backup);
    if (!isNaN(date.getTime())) {
      return `Backup from ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return backup; 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Paramètres
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          //color="primary"
          
          onClick={handleBackup}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <BackupIcon />}
        >
          {loading ? 'Creating Backup...' : 'Create Backup'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleRestore}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <RestoreIcon />}
        >
          {loading ? 'Restoring Backup...' : 'Restore Backup'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Available Backups:
      </Typography>
      {backups.length === 0 ? (
        <Typography>No backups available</Typography>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <List>
            {backups.map((backup, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => handleDownload(backup)}>
                  <DownloadIcon />
                </IconButton>
              }>
                <ListItemText primary={formatBackupName(backup)} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical:"top" , horizontal:"right"}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message ? 'error' : 'success'}
          sx={{ width: '100%' }}
         
          
        >
          {message || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Parametre;
*/

