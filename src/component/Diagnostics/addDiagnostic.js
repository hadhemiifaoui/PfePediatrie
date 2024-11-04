import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar,FormControl ,
    InputLabel , Select , MenuItem,
   styled  } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import casesServices from '../../services/casesServices';
import {Row , Col} from 'react-bootstrap'


const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
 
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
  fontSize: '12px',
  minHeight: '15px',

  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
const AddDiagnosticForm = ({handleClose, caseId , refresh}) => {
  const [factorRisks, setFactorRisks] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateDiagnosed, setDateDiagnosed] = useState('');
  //const [treatmentPlan, setTreatmentPlan] = useState('');
  const [severity , setSeverity] =useState('')
 
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log('caseId:', caseId);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!factorRisks.trim() || !name || !description || !dateDiagnosed ) {
      setFormError('tous les champs sont requisent');
      return;
    }

    try {
      const diagnosticData = {
        factorsRisks: factorRisks,
        name: name,
        description: description,
        dateDiagnosed: dateDiagnosed,
        severity : severity,
       // treatmentPlan: treatmentPlan,
       // confirmed: confirmed
      };

      await casesServices.addDiagnostic(caseId, diagnosticData);
      console.log('hjhjhjhjhj')
     
      setFactorRisks('');
      setName('');
      setDescription('');
      setDateDiagnosed('');
     // setTreatmentPlan('');
     // setConfirmed(false);

      setSeverity('')
      setFormError('');
      setSuccessMessage('Diagnostique Ajouté Avec Succé !!');
     
      setOpenSnackbar(true);
      refresh();
    } catch (error) {
      console.error('error add new diag:', error);
      setFormError(error.response ? error.response.data.error : error.message);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  
  const handleCancel = () => {
    handleClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <Row>
      <TextField
        label="Nom de cas clinique"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant='standard'
        style={{width:'80%'}}
        required
        margin="normal"
      /> </Row>
      <Row>
       <TextField
        label="Risques liés aux facteurs"
        name="factorRisks"
        value={factorRisks}
        onChange={(e) => setFactorRisks(e.target.value)}
        variant='standard'
        multiline
        style={{width:'80%'}}
        required
        margin="normal"
      /> </Row>
      <Row>
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant='standard'
        style={{width:'80%'}}
        multiline
        rows={4}
        margin="normal"
      /> </Row>
      <Row>
      <TextField
        type="date"
        label="Date du diagnostic"
        name="dateDiagnosed"
        value={dateDiagnosed}
        onChange={(e) => setDateDiagnosed(e.target.value)}
        variant='standard'
        style={{ width: 200 }}
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      /></Row>
    
      <Row>
      <FormControl fullWidth>
        <InputLabel>Gravité</InputLabel>
        <Select
          variant='standard'
          style={{ width: 200 }}
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          fullWidth
        >
          <MenuItem value="Faible">Faible</MenuItem>
          <MenuItem value="Moyenne">Moyenne</MenuItem>
          <MenuItem value="Fort">Fort</MenuItem>
        </Select>
      </FormControl>
      </Row>
     
      <Row>
      <Col xs={4} style={{ marginLeft: '65%' , marginTop:'4%' }}>
      <CancelButtonStyled onClick={handleCancel} style={{width:100,height:32}}>Annuler</CancelButtonStyled>

      <ButtonStyled type="submit" variant="contained" color="primary" style={{width:100 }}>
          Ajouter
      </ButtonStyled> </Col></Row>
    
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
         {formError}
    </Box>
  );
};

export default AddDiagnosticForm;

/* <Box mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              name="confirmed"
              color="primary"
            />
          }
          label="Confirmé"
          margin="normal"
        />
      </Box>*/

       /*  <Row>
      <TextField
        label="Plan de traitement"
        name="treatmentPlan"
        value={treatmentPlan}
        onChange={(e) => setTreatmentPlan(e.target.value)}
        variant='standard'
        style={{width:'80%'}}
        multiline
        rows={4}
        margin="normal"
      /></Row>*/