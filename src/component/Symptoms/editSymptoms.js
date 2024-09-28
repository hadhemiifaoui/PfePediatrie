import React, { useState, useEffect } from 'react'; 
import { Button, TextField, Box, Checkbox, FormControlLabel,MenuItem , FormGroup , Snackbar, styled} from '@mui/material';
import symptomServices from '../../services/symptomsServices';
import {Row , Col} from 'react-bootstrap'
import MuiAlert from '@mui/material/Alert'


const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '35px',
  width: '100px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});




const EditSymptomForm = ({ symptom, caseId }) => {
  const [symptomData, setSymptomData] = useState({
    fever: false,
    hypothermia: false,
    hemodynamicSigns: [],
    respiratorySigns: [],
    neurologicalSigns: [],
    cutaneousSigns: [],
    digestiveSigns: [],
    gravity: ''
  });
  
  const [successMessage , setSuccessMessage] =useState('');
  const [openSnackBar, setOpenSnackbar] = useState(null)




  const handleCloseSnackBar = () => {
    setOpenSnackbar(false)
  }



  useEffect(() => {
    if (symptom) {
      setSymptomData({
        fever: symptom.fever,
        hypothermia: symptom.hypothermia,
        hemodynamicSigns: symptom.hemodynamicSigns,
        respiratorySigns: symptom.respiratorySigns,
        neurologicalSigns: symptom.neurologicalSigns,
        cutaneousSigns: symptom.cutaneousSigns,
        digestiveSigns: symptom.digestiveSigns,
        gravity: symptom.gravity
      });
    }
  }, [symptom]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSymptomData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (event, arrayName) => {
    const { value } = event.target;
    setSymptomData((prevData) => ({
      ...prevData,
      [arrayName]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await symptomServices.updateSymptom(symptom._id, symptomData);
      setSuccessMessage('Symptôme mis a jour avec succé');
      setOpenSnackbar(true)
    } catch (error) {
      console.error('Error updating symptom:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col md={4}>
        <FormControlLabel
          control={<Checkbox checked={symptomData.fever} onChange={handleChange} name="fever" />}
          label="Fever"
        /> 
        </Col> 
        <Col md={4}>
        <FormControlLabel
          control={<Checkbox checked={symptomData.hypothermia} onChange={handleChange} name="hypothermia" />}
          label="Hypothermia"
        /> 
        </Col>
        </Row>
      </FormGroup>
      <Row>
      <Col md={4}>
      <TextField
         variant='standard'
         select
          style={{widht:'50%'}}
        name="hemodynamicSigns"
        label="Hemodynamic Signs"
        value={symptomData.hemodynamicSigns.join(', ')}
        onChange={(event) => handleArrayChange(event, 'hemodynamicSigns')}
        fullWidth
        margin="normal">  
           <MenuItem value="Hypertension">Hypertension</MenuItem>
           <MenuItem value="Hypotension">Hypotension</MenuItem>
           <MenuItem value="Tachycardie">Tachycardie</MenuItem>
           <MenuItem value="Bradycardie">Bradycardie</MenuItem>
           <MenuItem value="Normale">Normale</MenuItem>
      </TextField> </Col>
      <Col md={4}>
      <TextField
        select
        style={{widht:'50%'}}
        variant='standard'
        name="respiratorySigns"
        label="Respiratory Signs"
        value={symptomData.respiratorySigns.join(', ')}
        onChange={(event) => handleArrayChange(event, 'respiratorySigns')}
        fullWidth
        margin="normal"
        >
           <MenuItem value="Dyspnée">Dyspnée</MenuItem>
           <MenuItem value="Tachypnée">Tachypnée</MenuItem>
           <MenuItem value="Toux">Toux</MenuItem>
           <MenuItem value="Une respiration sifflante">Une respiration sifflante</MenuItem>
           <MenuItem value="Normale">Normale</MenuItem> 
      </TextField>
      </Col>
      </Row>
      <Row>
      <Col md={4}>
      <TextField
        select
        style={{widht:'50%'}}
         variant='standard'
        name="neurologicalSigns"
        label="Neurological Signs"
        value={symptomData.neurologicalSigns.join(', ')}
        onChange={(event) => handleArrayChange(event, 'neurologicalSigns')}
        fullWidth
        margin="normal"
      >   
          <MenuItem value="Saisies">Saisies</MenuItem>
          <MenuItem value="Mal de tête">Mal de tête</MenuItem>
          <MenuItem value="Vertiges">Vertiges</MenuItem>
          <MenuItem value="Normale">Normale</MenuItem>
      </TextField> </Col>
      <Col md={4}>
      <TextField
      style={{widht:'50%'}}
        name="cutaneousSigns"
        label="Cutaneous Signs"
        select  variant='standard'
        value={symptomData.cutaneousSigns.join(', ')}
        onChange={(event) => handleArrayChange(event, 'cutaneousSigns')}
        fullWidth
        margin="normal"
      > 
          <MenuItem value="Éruption cutanée">Éruption cutanée</MenuItem>
          <MenuItem value="Érythème">Érythème</MenuItem>
          <MenuItem value="Pétéchies">Pétéchies</MenuItem>
          <MenuItem value="Normale">Normale</MenuItem>
      </TextField> </Col> </Row>
      <Row>
      <Col md={4}>
      <TextField
        name="digestiveSigns"
        style={{widht:'50%'}}
        label="Digestive Signs"
        select  variant='standard'
        value={symptomData.digestiveSigns.join(', ')}
        onChange={(event) => handleArrayChange(event, 'digestiveSigns')}
        fullWidth
        margin="normal"
      >
          <MenuItem value="Vomissement">Vomissement</MenuItem>
          <MenuItem value="Diarrhée">Diarrhée</MenuItem>
          <MenuItem value="Constipation">Constipation</MenuItem>
          <MenuItem value="Douleur abdominale">Douleur abdominale</MenuItem>
          <MenuItem value="Normale">Normale</MenuItem>
      </TextField> </Col>
      <Col md={4}>
      <TextField
        name="gravity"
        style={{widht:'50%'}}
        select  variant='standard'
        label="Gravity"
        value={symptomData.gravity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >  
          <MenuItem value="Faible">Faible</MenuItem>
          <MenuItem value="Moyenne">Moyenne</MenuItem>
          <MenuItem value="Fort">Fort</MenuItem> 
      </TextField>
      </Col> </Row>
      
      <ButtonStyled type="submit"  style={{ marginLeft:'85%' }}>
         Modifier 
      </ButtonStyled>


       <Snackbar open={openSnackBar} onClose={handleCloseSnackBar} 
        autoHideDuration={6000} anchorOrigin={{vertical:'top' , horizontal:'right'}}
        >
          <MuiAlert onClose={handleCloseSnackBar} color='success'>
               {successMessage}
          </MuiAlert>
       </Snackbar>

    </Box>
  );
};

export default EditSymptomForm;
