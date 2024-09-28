/*import React, { useState } from 'react';
import {
  TextField, Button, Grid, Snackbar, Select, MenuItem, InputLabel
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import diagnosticservices from '../../services/diagnoticServices';

const EditDiagnosticForm = ({ initialValues }) => {
 
  const [formData, setFormData] = useState({
    factorRisks: initialValues.factorRisks || '',
    name: initialValues.name || '',
    description: initialValues.description || '',
    severity: initialValues.severity || '', 
    dateDiagnosed: initialValues.dateDiagnosed ? initialValues.dateDiagnosed.split('T')[0] : '',
    treatmentPlan: initialValues.treatmentPlan || '',
  });

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
      await diagnosticservices.updateDiagnostic(initialValues._id, formData);
      setSuccessMessage('Diagnostic Updated Successfully');
      setOpenSnackbar(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update diagnostic. Please try again.');
      }
      console.error('Error updating diagnostic:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Factor Risks"
              name="factorRisks"
              value={formData.factorRisks}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Diagnostic Date"
              name="dateDiagnosed"
              type="date"
              value={formData.dateDiagnosed}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Treatment Plan"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <MuiAlert severity="error" onClose={() => setError('')}>
                {error}
              </MuiAlert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Diagnostic
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
    </>
  );
};

export default EditDiagnosticForm;
*/