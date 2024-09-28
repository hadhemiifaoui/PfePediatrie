import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, styled, InputLabel, FormControl } from '@mui/material';
import Title from '../../title/title';
import vaccinservices from '../../../services/vaccinServices';

const StyledTextField = styled(TextField)({
  borderRadius: '6px',
  width: '100%',
});
 

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
  width: '75px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const NewVaccinationForm = ({ childId , patientId}) => {

   const [vaccinatedFor , setVaccinatedFor] = useState('');
   const [CaughtOn , setCaughtOn ]= useState('');
   const [vaccinName , setVaccinName]  = useState('');
   const [Details , setDetails] = useState('');
   const [notes , setNotes] = useState('');
 
   const data = {
    vaccinatedFor,
    CaughtOn,
    vaccinName,
    Details,
    notes,
    patient: patientId,
    child : childId
   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vaccinservices.create(data);
      setVaccinatedFor('');
      setCaughtOn('');
      setVaccinName('');
      setDetails('');
      setNotes('');
      alert('Vaccination created successfully!');
    } catch (error) {
      console.error('Error creating Vaccination:', error);
      alert('Failed to create Vaccination.');
    }
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Add New Vaccination</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Vaccinated For </InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="vaccinatedFor"
              variant="standard"
              value={vaccinatedFor}
              onChange={(e) => setVaccinatedFor(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Caught On</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
            type="date"
              id="CaughtOn"
              variant="standard"
              value={CaughtOn}
              onChange={(e) => setCaughtOn(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Vaccination Name</InputLabel></Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <StyledTextField
                id="vaccinName"
                value={vaccinName}
                onChange={(e) => setVaccinName(e.target.value)}
                variant="standard"
              />
            </FormControl>
          </Col>
          <Col md={2}><InputLabel shrink>Details</InputLabel></Col>
          <Col md={4}>
            <StyledTextField
              id="Details"
              variant="standard"
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Notes</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="notes"
              variant="standard"
              multiline
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8} />
          <Col md={4} className="d-flex justify-content-end">
            <CancelButtonStyled variant="contained">Cancel</CancelButtonStyled>
            <ButtonStyled type="submit" variant="contained">
              Submit
            </ButtonStyled>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NewVaccinationForm;
