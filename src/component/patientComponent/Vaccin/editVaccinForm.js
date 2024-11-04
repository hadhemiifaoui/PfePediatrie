import { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, styled, InputLabel, FormControl, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Title from '../../title/title';

import vaccinservices from '../../../services/vaccinServices';


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
    vaccinatedFor: initialValues.vaccinatedFor || '',
    CaughtOn: initialValues.CaughtOn || '',
    vaccinName: initialValues.vaccinName || '',
    Details: initialValues.Details || '',
    notes: initialValues.notes || ''  
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
      await vaccinservices.update(initialValues._id, formData);
      setSuccessMessage('Vaccination Updated Successfully');
      setOpenSnackbar(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update Vaccination. try again.');
      }
      console.error('Error updating Vaccination:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Modifier Vaccination</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Vacciné Pour</InputLabel></Col>
          <Col md={10}>
            <TextField
              id="vaccinatedFor"
              variant="standard"
              style={{width:'80%'}}
              value={formData.vaccinatedFor}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Décrit le</InputLabel></Col>
          <Col md={10}>
            <TextField
             type="date"
             style={{width:'40%'}}
              id="CaughtOn"
              variant="standard"
              value={formData.CaughtOn}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Nom</InputLabel></Col>
          <Col md={10}>
            <FormControl fullWidth variant="standard">
              <TextField
                id="vaccinName"
                name="vaccinName"
                style={{width:'80%'}}
                value={formData.vaccinName}
                onChange={handleChange}
                variant="standard"
              />
            </FormControl>
          </Col>
          </Row>
          <Row>
          <Col md={2}><InputLabel shrink>Détails</InputLabel></Col>
          <Col md={10}>
            <TextField
              id="Details"
              name="Details"  style={{width:'80%'}}
              variant="standard"
              value={formData.Details}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Notes</InputLabel></Col>
          <Col md={10}>
            <TextField
              id="notes"
              name="notes"
              variant="standard"  style={{width:'80%'}}
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={2}
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
