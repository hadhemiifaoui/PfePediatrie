import { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Title from '../../title/title';

import hospitalisationServices from '../../../services/hospitalisationServices';
import { styled } from '@mui/system';

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



const EditForm = ({ initialValues }) => {
   const [formData, setFormData] = useState({
    entryDate: initialValues.entryDate || '',
    releaseDate: initialValues.releaseDate || '',
    //DoctorName: initialValues.DoctorName || '',
    HospitalName: initialValues.HospitalName || '',
    Reasons: initialValues.Reasons || ''  
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hospitalisationServices.update(initialValues._id, formData);
      setSuccessMessage('Hospitalisation Updated Successfully');
      setOpenSnackbar(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update Hospitalisation. try again.');
      }
      console.error('Error updating Hospitalisation:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Modifier une hospitalisation</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Date d'entrée</InputLabel></Col>
          <Col md={3}>
            <TextField
              type='date'
              id="entryDate"
              variant="standard"
              value={formData.entryDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Date de sortie</InputLabel></Col>
          <Col md={3}>
            <TextField
             type='date'
              id="releaseDate"
              variant="standard"
              value={formData.releaseDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>

        </Row>
        <Row  className="mb-2 align-items-center">
       </Row>   

       <Row className="mb-2 align-items-center">
       <Col md={2}><InputLabel shrink>Nom de l'hopitale</InputLabel></Col>
          <Col md={9}>
            <TextField
              id="HospitalName"
              name="HospitalName"
              style={{ width: '100%'}}
              variant="standard"
              value={formData.HospitalName}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
    
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Raisons</InputLabel></Col>
          <Col md={9}>
            <TextField
              id="Reasons"
              multiline
              name="Reasons"
              style={{ width: '100%'}}
              variant="standard"
              rows={2}
              value={formData.Reasons}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
    
        <div className="d-flex justify-content-end">
          <ButtonStyled variant="primary" type="submit">
               Modifier
          </ButtonStyled>
        </div>
      </Form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
         {error && (
           <Snackbar
             open={true}
             autoHideDuration={6000}
            onClose={() => setError('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
           >
          <MuiAlert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </MuiAlert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditForm;

/*<Col md={2}><InputLabel shrink>Doctor Name</InputLabel></Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <StyledTextField
                id="DoctorName"
                name="DoctorName"
                value={formData.DoctorName}
                onChange={handleChange}
                variant="standard"
              />
            </FormControl>
          </Col>*/