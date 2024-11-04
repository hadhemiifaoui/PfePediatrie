import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Checkbox, FormControlLabel,
   FormGroup, Snackbar, Select, MenuItem, 
   FormControl, InputLabel, styled } from '@mui/material';
import treatementServices from '../../services/treatementServices';
import medicamentServices from '../../services/medicamentServices'; 
import { Row, Col } from 'react-bootstrap';
import MuiAlert from '@mui/material/Alert';

const ButtonStyled = styled(Button)( {
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '10px',
  minHeight: '35px',
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
  fontSize: '10px',
  minHeight: '15px',
  width: '100px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
const EditTreatmentForm = ({ handleCloseEditDialog ,treatement, refresh }) => {
  const [treatementData, setTreatementData] = useState({
    hospitalisation: false,
    maintienTemperature: '',
    monitorageCardioRespiratoire: false,
    medications: [],
    followUpInstructions: '',
    dietaryRestrictions: '',
    psychologicalSupport: false,
    additionalNotes: '',
    status: ''  
  });

  const [medicationList, setMedicationList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (treatement) {
      setTreatementData({
        hospitalisation: treatement.hospitalisation,
        maintienTemperature: treatement.maintienTemperature,
        monitorageCardioRespiratoire: treatement.monitorageCardioRespiratoire,
        medications: treatement.medications || [],
        followUpInstructions: treatement.followUpInstructions,
        dietaryRestrictions: treatement.dietaryRestrictions,
        psychologicalSupport: treatement.psychologicalSupport,
        additionalNotes: treatement.additionalNotes,
        status: treatement.status  
      });
    }

    const fetchMedications = async () => {
      try {
        const response = await medicamentServices.getMeds();
        setMedicationList(response);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, [treatement]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTreatementData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMedicationsChange = (index, field, value) => {
    const updatedMedications = [...treatementData.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setTreatementData((prevData) => ({
      ...prevData,
      medications: updatedMedications,
    }));
  };

  const handleMedicationSelectChange = (index, event) => {
    const updatedMedications = [...treatementData.medications];
    const selectedMedicationId = event.target.value;
    const selectedMedication = medicationList.find((med) => med._id === selectedMedicationId);

    updatedMedications[index] = { ...updatedMedications[index], medicament: selectedMedication };
    setTreatementData((prevData) => ({
      ...prevData,
      medications: updatedMedications,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await treatementServices.updateTreatement(treatement._id, treatementData);
      setSuccessMessage('Traitement mis à jour avec succès !');
      setOpenSnackbar(true);
      refresh();
    } catch (error) {
      console.error('Error updating treatment:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ width: '96%' }}>
      <FormGroup>
        <Row>
          <Col md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={treatementData.hospitalisation}
                  onChange={handleChange}
                  name="hospitalisation"
                />
              }
              label="Hospitalisation"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={treatementData.monitorageCardioRespiratoire}
                  onChange={handleChange}
                  name="monitorageCardioRespiratoire"
                />
              }
              label="Monitorage CardioRespiratoire"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={treatementData.psychologicalSupport}
                  onChange={handleChange}
                  name="psychologicalSupport"
                />
              }
              label="Support Psychologique"
            />
          </Col>
        </Row>
      </FormGroup>

      <Row>
        <TextField
          name="maintienTemperature"
          label="Maintien Température"
          value={treatementData.maintienTemperature}
          onChange={handleChange}
          variant='standard'
          margin="normal"
        />

        <TextField
          name="followUpInstructions"
          label="Instructions de suivi"
          value={treatementData.followUpInstructions}
          onChange={handleChange}
          fullWidth
          variant='standard'
          margin="normal"
        />

        <TextField
          name="dietaryRestrictions"
          label="Restrictions Alimentaires"
          value={treatementData.dietaryRestrictions}
          onChange={handleChange}
          fullWidth
          variant='standard'
          margin="normal"
        />
      </Row>

      <Row>
        <Col md={12}>
          <TextField
            name="additionalNotes"
            label="Notes Supplémentaires"
            value={treatementData.additionalNotes}
            onChange={handleChange}
            fullWidth
            multiline
            variant='standard'
            margin="normal"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={treatementData.status}
              style={{width:150}}
              onChange={handleChange}
            >
              <MenuItem value="confirmé">Actif</MenuItem>
              <MenuItem value="rejeté">Inactif</MenuItem>
              <MenuItem value="en attente">En attente</MenuItem>
           
            </Select>
          </FormControl>
        </Col>
      </Row>

      <Box>
        {treatementData.medications.map((med, index) => (
          <Box key={index} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControl fullWidth margin="normal" style={{ flex: 1, marginRight: '10px' }}>
              <InputLabel>Médicament</InputLabel>
              <Select
                value={med.medicament?._id || ''}
                onChange={(event) => handleMedicationSelectChange(index, event)}
                variant="standard"
                style={{ backgroundColor: '#fff', width: '100%' }}
              >
                {medicationList.map((medication) => (
                  <MenuItem key={medication._id} value={medication._id}>
                    {medication.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="dosage"
              label="Dosage"
              value={med.dosage || ''}
              onChange={(event) => handleMedicationsChange(index, 'dosage', event.target.value)}
              style={{ flex: 1, marginRight: '10px' }}
              variant="standard"
              margin="normal"
            />

            <TextField
              name="frequency"
              label="Fréquence"
              value={med.frequency || ''}
              onChange={(event) => handleMedicationsChange(index, 'frequency', event.target.value)}
              style={{ flex: 1, marginRight: '10px' }} 
              variant="standard"
              margin="normal"
            />
              <TextField
              name="duree"
              label="Duréé"
              value={med.duration || ''}
              onChange={(event) => handleMedicationsChange(index, 'duration', event.target.value)}
              style={{ flex: 1 }}  
              variant="standard"
              margin="normal"
            />
          </Box>
        ))}
      </Box>

      <div style={{ marginLeft:'72%' }}>
        <CancelButtonStyled  onClick={handleCloseEditDialog}>Annuler</CancelButtonStyled>
        <ButtonStyled type="submit" >
          Modifier
        </ButtonStyled>
      </div>

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
    </Box>
  );
};

export default EditTreatmentForm;

