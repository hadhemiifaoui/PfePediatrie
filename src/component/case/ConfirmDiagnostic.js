import React, { useState } from 'react';
import { TextField, Button, DialogActions, Grid } from '@mui/material';

const ConfirmDiagnosticForm = ({ diagnostic, onSubmit, onCancel }) => {
  const [testBactResults, setTestBactResults] = useState('');
  const [testCardioResults, setTestCardioResults] = useState('');
  const [testBioResults, setTestBioResults] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      testBactResults,
      testCardioResults,
      testBioResults
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Test Bactériologique Results"
            value={testBactResults}
            onChange={(e) => setTestBactResults(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Test Cardiologiques Results"
            value={testCardioResults}
            onChange={(e) => setTestCardioResults(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Test Biologique Results"
            value={testBioResults}
            onChange={(e) => setTestBioResults(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </form>
  );
};

export default ConfirmDiagnosticForm;
