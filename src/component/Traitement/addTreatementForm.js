import React, { useState, useEffect } from 'react';
import { Box,  TextField, Button, Checkbox, FormControlLabel, FormControl , InputLabel ,Snackbar,styled
   , Typography, MenuItem, Select } from '@mui/material';
import medicamentServices from '../../services/medicamentServices';
import treatementservices from '../../services/treatementServices';
//import { Row, Col } from 'react-bootstrap';

import MuiAlert from '@mui/material/Alert';

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '100px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});

const CancelButtonStyled = styled(Button)({
  backgroundColor: '#f44336',
  color: '#fff',
  marginTop: '15px',
  padding: '8px',
  fontSize: '9px',
  minHeight: '15px',
  width: '100px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const AddTreatmentForm = ({ handleCloseAddDiag ,caseId, refresh }) => {
 
  const [hospitalisation, setHospitalisation] = useState(false);
  const [maintienTemperature, setMaintienTemperature] = useState('');
  const [monitorageCardioRespiratoire, setMonitorageCardioRespiratoire] = useState(false);
  const [medications, setMedications] = useState([{ medicamentId: '', dosage: '', frequency: '', duration: '' }]);
  const [allMedications, setAllMedications] = useState([]);
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [psychologicalSupport, setPsychologicalSupport] = useState(false);
  //const [status , setStatus] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const meds = await medicamentServices.getMeds();
        console.log(meds);
        setAllMedications(meds); 
      } catch (error) {
        console.error("error getting medicament:", error);
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
      //status,
      additionalNotes,
      caseName: caseId
    };

    try {
      await treatementservices.create(data);
      setSuccessMessage('Traitement ajouté avec succès!');
      setOpenSnackbar(true);  
      refresh();
     // refresh();
    } catch (err) {
      console.error(err);
    }
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}  style={{width:'100%'}}>
       <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} color="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
      

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
        label="Maintien Température"
         variant='standard'
         style={{width:'60%'}}
        value={maintienTemperature}
        onChange={(e) => setMaintienTemperature(e.target.value)}
        margin="normal"
      />

      <Typography variant="h6"></Typography>
      {medications.map((medication, index) => (
        <Box key={index} marginBottom="10px">
          <Select
            label="Nom du médicament"
            value={medication.medicamentId}
            onChange={(e) => handleMedicationChange(index, 'medicamentId', e.target.value)}
            variant='standard'
            style={{width:'60%'}}
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
            variant='standard'
            style={{width:'60%'}}
            margin="normal"
          />
          <TextField
            label="Fréquence"
            value={medication.frequency}
            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
            variant='standard'
            style={{width:'60%'}}
            margin="normal"
          />
          <TextField
            label="Durée"
            value={medication.duration}
            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
            variant='standard'
            style={{width:'60%'}}
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={handleAddMedication}>Ajouter un Médicament</Button>

      <TextField
        label="Instructions de Suivi"
        variant='standard'
        style={{width:'80%', marginLeft: '-210px'}}
        value={followUpInstructions}
        onChange={(e) => setFollowUpInstructions(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Restrictions Alimentaires"
        variant='standard'
        style={{width:'80%'}}
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        margin="normal"
      />
   <TextField
        label="Notes"
        variant='standard'
        style={{width:'80%'}}
        multiline
        rows={4}
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        margin="normal"
      />
      
      <div style={{ marginLeft:'72%' }}>
        <CancelButtonStyled  onClick={handleCloseAddDiag}>Annuler</CancelButtonStyled>
        <ButtonStyled type="submit" >
          Ajouter
        </ButtonStyled>
      </div>
     
      
    </Box>
    
  );
};

export default AddTreatmentForm;

/*<Row>
        <Col md={12}>
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="confirmed">Actif</MenuItem>
              <MenuItem value="rejected">Inactif</MenuItem>
              <MenuItem value="pending">En attente</MenuItem>
           
            </Select>
          </FormControl>
        </Col>
      </Row>*/