import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import casesServices from '../../services/casesServices';

const AddTreatmentForm = ({ caseId }) => {
  const [hospitalisation, setHospitalisation] = useState(false);
  const [maintienTemperature, setMaintienTemperature] = useState('');
  const [monitorageCardioRespiratoire, setMonitorageCardioRespiratoire] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false); 

  useEffect(() => {
    if (currentTreatment) {
      setHospitalisation(currentTreatment.hospitalisation);
      setMaintienTemperature(currentTreatment.maintienTemperature);
      setMonitorageCardioRespiratoire(currentTreatment.monitorageCardioRespiratoire);
      setIsEditMode(true);
    } else {
      setHospitalisation(false);
      setMaintienTemperature('');
      setMonitorageCardioRespiratoire(false);
      setIsEditMode(false);
    }
  }, [currentTreatment]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'hospitalisation':
        setHospitalisation(checked);
        break;
      case 'monitorageCardioRespiratoire':
        setMonitorageCardioRespiratoire(checked);
        break;
      default:
        break;
    }
  };

  const handleTemperatureChange = (event) => {
    setMaintienTemperature(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const treatmentData = {
        hospitalisation,
        maintienTemperature,
        monitorageCardioRespiratoire,
        
      };
      console.log('Submitting treatment:', { caseId, treatmentData });

      if (isEditMode) {
        await casesServices.updateTreatment(caseId, currentTreatment._id, treatmentData);
      } else {
        await casesServices.addTreatment(caseId, treatmentData);
      }
      setHospitalisation(false);
      setMaintienTemperature('');
      setMonitorageCardioRespiratoire(false);
      setCurrentTreatment(null);
    } catch (error) {
      console.error('Error adding/updating treatment:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <FormControlLabel
        control={<Checkbox name="hospitalisation" checked={hospitalisation} onChange={handleCheckboxChange} />}
        label="Hospitalisation"
      />
      <FormControl fullWidth>
        <InputLabel>Temperature</InputLabel>
        <Select
          value={maintienTemperature}
          onChange={handleTemperatureChange}
          fullWidth
        >
          <MenuItem value="37">37</MenuItem>
          <MenuItem value="40">40</MenuItem>
          <MenuItem value="45">45</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox name="monitorageCardioRespiratoire" checked={monitorageCardioRespiratoire} onChange={handleCheckboxChange} />}
        label="Cardiorespiratory Monitoring"
      />
      <Button type="submit" variant="contained" color="primary">
        {isEditMode ? 'Update Treatment' : 'Add Treatment'}
      </Button>
    </Box>
  );
};

export default AddTreatmentForm;
