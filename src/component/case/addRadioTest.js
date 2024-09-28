import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import testservices from '../../services/testServices';

const AddRadiologiqueForm = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    radiographiePulmonaire: '',
    asp: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await testservices.createTest({
        type: 'radiologique',
        details: formValues,
      });
      console.log('Radiologique test added:', response);
      onClose();
    } catch (error) {
      console.error('Error adding radiologique test:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Radiologique Test</DialogTitle>
      <DialogContent>
        <TextField
          select
          name="radiographiePulmonaire"
          label="Radiographie Pulmonaire"
          value={formValues.radiographiePulmonaire}
          onChange={handleChange}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value=""></option>
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
          <option value="Not Performed">Not Performed</option>
        </TextField>
        <TextField
          select
          name="asp"
          label="ASP"
          value={formValues.asp}
          onChange={handleChange}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value=""></option>
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
          <option value="Not Performed">Not Performed</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRadiologiqueForm;
