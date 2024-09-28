import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, FormControl, Container, InputLabel, Select, MenuItem, Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import casesServices from '../../services/casesServices';

const EditCaseForm = ({ caseItem, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    severity: '',
    pediatricType: '',
    description: '',
    notes: '',
    dateOpened: '', // make sure this is included
  });

  useEffect(() => {
    if (caseItem) {
      setFormData({
        title: caseItem.title || '',
        status: caseItem.status || '',
        severity: caseItem.severity || '',
        pediatricType: caseItem.pediatricType || '',
        description: caseItem.description || '',
        notes: caseItem.notes || '',
        dateOpened: caseItem.dateOpened || '', // ensure dateOpened is populated
      });
    }
  }, [caseItem]);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await casesServices.update(caseItem._id, formData);
      setSuccessMessage('Cas clinique mis a jour avec succé');
      setOpenSnackbar(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update case. Please try again.');
      }
      console.error('Error updating case:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Titre"
              name="title"
              style={{ width: '80%' }}
              value={formData.title}
              onChange={handleChange}
              variant="standard"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="status"
              select
              label="statut"
              variant="standard"
              style={{ width: '50%' }}
              required
              value={formData.status}
              onChange={handleChange}
            >
              {['Ouverte', 'Fermé'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={{ width: '70%' }} variant="standard">
              <InputLabel>Type Pédiatrique</InputLabel>
              <Select
                label="Type Pédiatrique"
                name="pediatricType"
                value={formData.pediatricType}
                onChange={handleChange}
                required
              >
                {[
                  'Neonatologie',
                  'Pneumologie pédiatrique',
                  'Cardiologie pédiatrique',
                  'Oto-rhino-laryngologie pédiatrique',
                  'Neurologie pédiatrique',
                  'Pathologies infectieuses pédiatriques',
                  'Hépato-gastro-entérologie',
                  'Endocrinologie',
                  'Nephrologie',
                  'Dermatologie pédiatrique',
                  'Hématologie pédiatrique',
                  'Chirurgie pédiatrique',
                  'Urgences chirurgicales',
                  'Intoxication chez l’enfant',
                  'Réanimation pédiatrique',
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="severity-label">Gravité</InputLabel>
            <Select
              labelId="severity-label"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
              variant="standard"
            >
              <MenuItem value="Faible">Faible</MenuItem>
              <MenuItem value="Moyenne">Moyenne</MenuItem>
              <MenuItem value="Fort">Fort</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '80%' }}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="standard"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '80%' }}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              variant="standard"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '80%' }}
              type="date"
              label=""
              name="dateOpened"
              value={formData.dateOpened}
              onChange={handleChange}
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <MuiAlert severity="error">{error}</MuiAlert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#B3E5FC',
                '&:hover': { bgcolor: '#81D4FA' },
                minHeight: 'unset',
              }}
              style={{ marginLeft: '90%' }}
            >
              Modifier
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default EditCaseForm;
