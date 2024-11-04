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
  

const EditBiologicalTest = ({ onClose, test, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'TestBiologiques',
    hemogramme: '',
    procalcitonine: '',
    crp: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(null);

  useEffect(() => {
    if (test) {
      const { hemogramme, procalcitonine, crp } = test;
      setFormData((prevData) => ({
        ...prevData,
        hemogramme,
        procalcitonine,
        crp
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
      setSuccessMessage('Test Updated Successfully !!');
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
      <Row md={6} style={{ marginLeft: '10%' }}>
        <Col>
          <TextField
            margin="normal"
            style={{ width: 200, display: 'flex' }}
            select
            variant="standard"
            name="hemogramme"
            label="Hemogramme"
            value={formData.hemogramme}
            onChange={handleChange}
          >
            <MenuItem value="Normale">Normale</MenuItem>
            <MenuItem value="Anormale">Anormale</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>

          <TextField
            margin="normal"
            select
            variant="standard"
            style={{ width: 200, display: 'flex' }}
            name="procalcitonine"
            label="Procalcitonine"
            value={formData.procalcitonine}
            onChange={handleChange}
          >
            <MenuItem value="Faible">Faible</MenuItem>
            <MenuItem value="Moyenne">Moyenne</MenuItem>
            <MenuItem value="Fort">Fort</MenuItem>
            <MenuItem value="Non Exécuté">Non Exécuté</MenuItem>
          </TextField>

          <TextField
            margin="normal"
            select
            style={{ width: 200, display: 'flex' }}
            variant="standard"
            name="crp"
            label="CRP"
            value={formData.crp}
            onChange={handleChange}
          >
            <MenuItem value="Normale">Normale</MenuItem>
            <MenuItem value="Élevé">Élevé</MenuItem>
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

      {successMessage && (
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
      )}
    </Box>
  );
};

export default EditBiologicalTest;
