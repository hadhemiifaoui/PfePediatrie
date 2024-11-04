import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, MenuItem, Snackbar , styled } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import testservices from '../../services/testServices';
import { Row, Col } from 'react-bootstrap';

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


const EditBacteriologicTest = ({ onClose , test, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'TestBacteriologiques',
    hemoculture: '',
    pl: '',
    ecbu: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(null);

  useEffect(() => {
    if (test) {
      const { hemoculture, pl, ecbu } = test;
      setFormData((prevData) => ({
        ...prevData,
        hemoculture,
        pl,
        ecbu
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
      setSuccessMessage('Test Updated Successfully!!');
      setOpenSnackBar(true);
      if (onEditSuccess) {
        onEditSuccess(updatedTest);
      }
      console.log('Updated test:', updatedTest);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate style={{ width: 500 }}>
      <Row md={6} style={{ marginLeft: '5%' }}>
        <Col md={4}>
          <TextField
            margin="normal"
            variant="standard"
            style={{ width: 200 }}
            select
            name="hemoculture"
            label="Hemmoculture"
            value={formData.hemoculture}
            onChange={handleChange}
          >
            <MenuItem value="Positive">Positive</MenuItem>
            <MenuItem value="Negative">Negative</MenuItem>
            <MenuItem value="Inconclusive">Inconclusive</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            select
            variant="standard"
            style={{ width: 200 }}
            name="pl"
            label="PL"
            value={formData.pl}
            onChange={handleChange}
          >
            <MenuItem value="Localisée">Localisée</MenuItem>
            <MenuItem value="Generalized">Généralisée</MenuItem>
            <MenuItem value="Non Appliqué">Non Appliqué</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            variant="standard"
            style={{ width: 200 }}
            select
            name="ecbu"
            label="ECBU"
            value={formData.ecbu}
            onChange={handleChange}
          >
            <MenuItem value="Positive">Positive</MenuItem>
            <MenuItem value="Negative">Negative</MenuItem>
            <MenuItem value="Inconclusive">Inconclusive</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>
        </Col>
      </Row>
      <div style={{ marginTop: '10%' , marginLeft:'55%'  }}>
                       <CancelButtonStyled  onClick={onClose}>Annuler</CancelButtonStyled>
                        <ButtonStyled type="submit" >
                              Modifier
                             </ButtonStyled>
                   </div>


      <Snackbar
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackBar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default EditBacteriologicTest;
