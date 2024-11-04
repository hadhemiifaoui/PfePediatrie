
import { Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button, Snackbar , 
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import MuiAlert from '@mui/material/Alert';
import casesServices from '../../services/casesServices';

const testTypes = [
  'Test Bactériologiques',
  'Test Radiologiques',
  'Test Biologiques'
];

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '8px',
  fontSize: '10px',
  minHeight: '15px',
  width: '75px',
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

const AddTest = ({handleCloseAddDialog, caseId , refresh}) => {
  const [testType, setTestType] = useState('');
  const [formData, setFormData] = useState({});
  const [successMessage , setSuccessMessage] = useState('');
  const [openSnackBar , setOpenSnackBar] = useState(null);

  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
    setFormData({}); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleSnackbarClose = () =>{
    setOpenSnackBar(false)
   }
   
   const handleCancel = () =>{
    handleCloseAddDialog()
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const testData = { type: testType, ...formData };
      console.log('Submitting test data:', testData);
      await casesServices.addTest(caseId, testData);
      setSuccessMessage("Test Added Successufully !!");
      refresh();
      setOpenSnackBar(true);

    } catch (error) {
      console.error('Failed to add test:', error);
      alert('Failed to add test Please check the input data and try again');
    }
  };

  return (
    <Container >
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type de Test</InputLabel>
              <Select value={testType} onChange={handleTestTypeChange} variant='standard' style={{width: 250}}>
                <MenuItem value=""><em>None</em></MenuItem>
                {testTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col md={5}>
            {testType === 'Test Bactériologiques' && (
              <Box>
                <TextField
                  name="hemoculture"
                  label="Hemoculture"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.hemoculture || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                  <MenuItem value="Inconclusive">Inconclusive</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <TextField
                  name="pl"
                  label="PL"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.pl || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Localisée">Localisée</MenuItem>
                  <MenuItem value="Généralisée">Généralisée</MenuItem>
                  <MenuItem value="Non Appliqué">Non Appliqué</MenuItem>
                </TextField>
                <TextField
                  name="ecbu"
                  label="ECBU"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.ecbu || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                  <MenuItem value="Inconclusive">Inconclusive</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <div style={{ marginTop: '10%' , marginLeft:'40%'  }}>
                       <CancelButtonStyled  onClick={handleCancel}>Annuler</CancelButtonStyled>
                        <ButtonStyled type="submit" >
                              Ajouter
                             </ButtonStyled>
                   </div>
              </Box>
            )}
            {testType === 'Test Radiologiques' && (
              <Box>
                <TextField
                  name="radiographiePulmonaire"
                  label="Radiographie Pulmonaire"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.radiographiePulmonaire || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Normale">Normale</MenuItem>
                  <MenuItem value="Anormale">Anormale</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <TextField
                  name="asp"
                  label="ASP"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.asp || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Normale">Normale</MenuItem>
                  <MenuItem value="Abnormal">Anormale</MenuItem>
                  <MenuItem value="Non Exécut">Non Exécuté</MenuItem>
                </TextField>
                <div style={{ marginTop: '10%'  }}>
                       <CancelButtonStyled  onClick={handleCancel}>Annuler</CancelButtonStyled>
                        <ButtonStyled type="submit" >
                              Ajouter
                             </ButtonStyled>
                   </div>
              </Box>
            )}
            {testType === 'Test Biologiques' && (
              <Box>
                <TextField
                  name="hemogramme"
                  label="Hemogramme"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.hemogramme || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Normale">Normale</MenuItem>
                  <MenuItem value="Anormale">Anormale</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <TextField
                  name="procalcitonine"
                  label="Procalcitonine"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.procalcitonine || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Faible">Faible</MenuItem>
                  <MenuItem value="Moyenne">Moyenne</MenuItem>
                  <MenuItem value="Fort">Fort</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <TextField
                  name="crp"
                  label="CRP"
                  select
                  variant='standard'
                  fullWidth
                  margin="normal"
                  value={formData.crp || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Normale">Normale</MenuItem>
                  <MenuItem value="Élevé">Élevé</MenuItem>
                  <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
                </TextField>
                <div style={{ marginTop: '10%' }}>
                       <CancelButtonStyled  onClick={handleCancel}>Annuler</CancelButtonStyled>
                        <ButtonStyled type="submit" >
                              Ajouter
                             </ButtonStyled>
                   </div>
              </Box>
            )}
          </Col>
        </Row>
      </form>
      <Snackbar
        open={openSnackBar}
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

export default AddTest;
