/*import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import treatementservices from '../../services/treatementServices';
import { useAuth } from '../authentification/AuthContext';
const AddTreatmentForm = ({ caseId, refresh }) => {
  const { userRole } = useAuth();

  const [hospitalisation, setHospitalisation] = useState(false);
  const [maintienTemperature, setMaintienTemperature] = useState('');
  const [monitorageCardioRespiratoire, setMonitorageCardioRespiratoire] = useState(false);
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [psychologicalSupport, setPsychologicalSupport] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  console.log('caseId:', caseId);

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      hospitalisation,
      maintienTemperature,
      monitorageCardioRespiratoire,
      medications,
      followUpInstructions,
      dietaryRestrictions,
      psychologicalSupport,
      additionalNotes,  
      caseName: caseId    
    };

    try {
      await treatementservices.create(data);
      refresh(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6">Ajouter un Nouveau Traitement</Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={hospitalisation}
            onChange={(e) => setHospitalisation(e.target.checked)}
          />
        }
        label="Hospitalisation"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={monitorageCardioRespiratoire}
            onChange={(e) => setMonitorageCardioRespiratoire(e.target.checked)}
          />
        }
        label="Monitorage Cardio-Respiratoire"
      />

      <TextField
        label="Maintien Température"
        fullWidth
        value={maintienTemperature}
        onChange={(e) => setMaintienTemperature(e.target.value)}
        margin="normal"
      />

      <Typography variant="h6">Medications</Typography>
      {medications.map((medication, index) => (
        <Box key={index} marginBottom="10px">
          <TextField
            label="Nom du médicament"
            value={medication.name}
            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dosage"
            value={medication.dosage}
            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fréquence"
            value={medication.frequency}
            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Durée"
            value={medication.duration}
            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={handleAddMedication}>Ajouter un Médicament</Button>

      <TextField
        label="Instructions de Suivi"
        fullWidth
        value={followUpInstructions}
        onChange={(e) => setFollowUpInstructions(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Restrictions Alimentaires"
        fullWidth
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={psychologicalSupport}
            onChange={(e) => setPsychologicalSupport(e.target.checked)}
          />
        }
        label="Soutien Psychologique"
      />

      <TextField
        label="Notes Additionnelles"
        fullWidth
        multiline
        rows={4}
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Ajouter Traitement
      </Button>
    </Box>
  );
};

export default AddTreatmentForm;

*/


import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, MenuItem, Select } from '@mui/material';
import medicamentServices from '../../services/medicamentServices';
import treatementservices from '../../services/treatementServices';
import { useAuth } from '../authentification/AuthContext';

const AddTreatmentForm = ({ caseId, refresh }) => {
  const { userRole } = useAuth();

  const [hospitalisation, setHospitalisation] = useState(false);
  const [maintienTemperature, setMaintienTemperature] = useState('');
  const [monitorageCardioRespiratoire, setMonitorageCardioRespiratoire] = useState(false);
  const [medications, setMedications] = useState([{ medicamentId: '', dosage: '', frequency: '', duration: '' }]);
  const [allMedications, setAllMedications] = useState([]);
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [psychologicalSupport, setPsychologicalSupport] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const meds = await medicamentServices.getMeds();
        console.log(meds);
        setAllMedications(meds); 
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  const handleAddMedication = () => {
    setMedications([...medications, { medicamentId: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      hospitalisation,
      maintienTemperature,
      monitorageCardioRespiratoire,
      medications: medications.map(med => ({
        medicament: med.medicamentId, 
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration
      })),
      followUpInstructions,
      dietaryRestrictions,
      psychologicalSupport,
      additionalNotes,
      caseName: caseId
    };

    try {
      await treatementservices.create(data);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6">Ajouter un Nouveau Traitement</Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={hospitalisation}
            onChange={(e) => setHospitalisation(e.target.checked)}
          />
        }
        label="Hospitalisation"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={monitorageCardioRespiratoire}
            onChange={(e) => setMonitorageCardioRespiratoire(e.target.checked)}
          />
        }
        label="Monitorage Cardio-Respiratoire"
      />

      <TextField
        label="Maintien Température"
        fullWidth
        value={maintienTemperature}
        onChange={(e) => setMaintienTemperature(e.target.value)}
        margin="normal"
      />

      <Typography variant="h6">Médicaments</Typography>
      {medications.map((medication, index) => (
        <Box key={index} marginBottom="10px">
          <Select
            label="Nom du médicament"
            value={medication.medicamentId}
            onChange={(e) => handleMedicationChange(index, 'medicamentId', e.target.value)}
            fullWidth
            margin="normal"
            displayEmpty
          >
            <MenuItem value="">
              <em>Choisir un médicament</em>
            </MenuItem>
            {allMedications.map((med) => (
              <MenuItem key={med._id} value={med._id}>
                {med.nom}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Dosage"
            value={medication.dosage}
            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fréquence"
            value={medication.frequency}
            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Durée"
            value={medication.duration}
            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={handleAddMedication}>Ajouter un Médicament</Button>

      <TextField
        label="Instructions de Suivi"
        fullWidth
        value={followUpInstructions}
        onChange={(e) => setFollowUpInstructions(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Restrictions Alimentaires"
        fullWidth
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={psychologicalSupport}
            onChange={(e) => setPsychologicalSupport(e.target.checked)}
          />
        }
        label="Soutien Psychologique"
      />

      <TextField
        label="Notes Additionnelles"
        fullWidth
        multiline
        rows={4}
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Ajouter Traitement
      </Button>
    </Box>
  );
};

export default AddTreatmentForm;
