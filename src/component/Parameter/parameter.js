import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress, Snackbar, Alert, Button, List, ListItem,
  ListItemText, Typography, Box, Paper, IconButton, TextField
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import DownloadIcon from '@mui/icons-material/Download';
//import DeleteIcon from '@mui/icons-material/Delete';
import {Trash } from 'react-bootstrap-icons';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './parameter.css';
import Title from "../title/title"
const Parametre = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [backups, setBackups] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/backup/list');
        if (response.data.backups) {
          setBackups(response.data.backups);
        } else {
          setMessage('No backups found.');
          setOpenSnackbar(true);
        }
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

  const handleRestore = async (backupName) => {
    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    try {
      await axios.post(`http://localhost:3001/backup/restore/${backupName}`);
      setSuccessMessage(`Backup "${backupName}" restauré avec succè`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('error restor backupp ' + error.message);
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
      await axios.delete(`http://localhost:3001/backup/delete/${backupName}`);
      setSuccessMessage('Backup supprimé avec succè');
      setOpenSnackbar(true);
      const listResponse = await axios.get('http://localhost:3001/backup/list');
      setBackups(listResponse.data.backups);
    } catch (error) {
      setMessage('error delete ' + error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadBackup = async () => {
    if (!selectedFile) {
      setMessage('Sélectionner un fichier pour le télécharger');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setSuccessMessage('');
    setOpenSnackbar(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:3001/backup/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccessMessage('Backup téléchargé avec succè');
      setOpenSnackbar(true);
      const listResponse = await axios.get('http://localhost:3001/backup/list');
      setBackups(listResponse.data.backups);
    } catch (error) {
      setMessage('error upload: ' + error.message);
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
      return `Backup de ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return backup;
  };

  return (
    <Box sx={{ p: 3 , marginTop :'3%' }} >
      <Typography variant="h4" >
        
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleBackup}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <BackupIcon />}
        >
          {loading ? 'Création de backup...' : 'Créer backup'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: '.zip' }}
        />
        <Button
          variant="contained"
          onClick={handleUploadBackup}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <UploadFileIcon />}
        >
          {loading ? 'Uploading Backup...' : 'Upload Backup'}
        </Button>
      </Box>
  
      {backups.length === 0 ? (
        <Typography>Auccun backup trouvé</Typography>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography><Title>Liste des Sauvegardes</Title></Typography>
          <List>
            {backups.map((backup, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleDownload(backup)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleRestore(backup)} sx={{color :'green'}}>
                      <RestoreIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(backup)} sx={{color :'#f5590b'}}>
                      <Trash  color='red' fontSize={18}/>
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
