import React, { useEffect, useState } from 'react';
import {
  Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Fab, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import casesServices from '../../services/casesServices';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import AddTreatmentForm from './addTreatment';

const TreatmentsList = ({ caseId, onClose }) => {
  const [treatments, setTreatments] = useState([]);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const treatmentData = await casesServices.viewTreatments(caseId);
        console.log('Response data:', treatmentData);
        setTreatments(treatmentData);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, [caseId]);

  const toggleTreatmentForm = () => {
    setShowTreatmentForm(!showTreatmentForm);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Treatments for Case ID: {caseId}
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={toggleTreatmentForm}
          sx={{
            bgcolor: '#B3E5FC',
            '&:hover': { bgcolor: '#81D4FA' },
            width: 40,
            height: 40,
            minHeight: 'unset'
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hospitalisation</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Cardiorespiratory Monitoring</TableCell>
              <TableCell>Medicament</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map((treatment, index) => (
              <TableRow key={index}>
                <TableCell>{treatment.hospitalisation ? 'Yes' : 'No'}</TableCell>
                <TableCell>{treatment.maintienTemperature}</TableCell>
                <TableCell>{treatment.monitorageCardioRespiratoire ? 'Yes' : 'No'}</TableCell>
                <TableCell>{treatment.medicament}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
        Close
      </Button>
      <Dialog open={showTreatmentForm} onClose={toggleTreatmentForm} fullWidth maxWidth="sm">
        <DialogTitle>Add New Treatment</DialogTitle>
        <DialogContent>
          <AddTreatmentForm onSuccess={toggleTreatmentForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleTreatmentForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TreatmentsList;
