import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Snackbar, MenuItem , styled} from '@mui/material';
import testservices from '../../services/testServices';
import { Row, Col } from 'react-bootstrap';
import MuiAlert from '@mui/material/Alert';

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '90px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});


const EditRadiologicTest = ({ test, onEditSuccess }) => {
  
  const [formData, setFormData] = useState({
    type: 'TestRadiologiques', 
    radiographiePulmonaire: '',
    asp: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (test) {
      const { radiographiePulmonaire, asp } = test;
      setFormData((prevData) => ({
        ...prevData,
        radiographiePulmonaire,
        asp
      }));
    }
  }, [test]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTest = await testservices.updateTest(test._id, formData);
      setSuccessMessage('Test Mis A Jour Avec Succé!!');
      setOpenSnackBar(true);
      if (onEditSuccess) {
        onEditSuccess(updatedTest);
      }
      console.log('Updated test:', updatedTest);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate style={{ width: 500 }}>
      <Row md={6} style={{ marginLeft: '5%' }}>
        <Col>
          <TextField
            style={{ width: 200, display: 'flex' }}
            select
            variant='standard'
            name="radiographiePulmonaire"
            label="Radiographie Pulmonaire"
            value={formData.radiographiePulmonaire}
            onChange={handleChange}
          >
            <MenuItem value="Normale">Normale</MenuItem>
            <MenuItem value="Anormale">Anormale</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>
          <TextField
            style={{ width: 200, display: 'flex' }}
            select
            variant='standard'
            name="asp"
            label="ASP"
            value={formData.asp}
            onChange={handleChange}
          >
            <MenuItem value="Normale">Normale</MenuItem>
            <MenuItem value="Anormale">Anormale</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>
        </Col>
      </Row>
         
      <ButtonStyled type="submit" style={{marginLeft:'80%'}}>Modifier</ButtonStyled>

      {successMessage && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </MuiAlert>
        </Snackbar>
      )}
      
    </Box>
  );
};
export default EditRadiologicTest;
