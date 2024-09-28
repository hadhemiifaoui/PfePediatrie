import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { TextField, InputLabel, Button, FormControl } from '@mui/material';
import Title from '../../title/title';
import hospitalisationServices from '../../../services/hospitalisationServices';
import { styled } from '@mui/system';

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

const NewHospitalisationForm = ({childId , patientId}) => {
  const [entryDate, setEntryDate] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [DoctorName, setDoctorName] = useState('');
  const [HospitalName, setHospitalName] = useState('');
  const [Reasons, setReasons] = useState('');

  const data = {
    entryDate,
    releaseDate,
    DoctorName,
    HospitalName,
    Reasons,
    patient: patientId,
    child : childId
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await hospitalisationServices.create(data);
      setEntryDate('');
      setReleaseDate('');
      setDoctorName('');
      setHospitalName('');
      setReasons('');
      alert('Hospitalisation created successfully!');
    } catch (error) {
      console.error('Error creating Hospitalisation:', error);
      alert('Failed to create Hospitalisation.');
    }
  };

  return (
    <Container style={{ marginTop: '20px', maxWidth: '800px', height: '40vh' }}>
      <h4 style={{ marginBottom: '20px' }}>
        <Title>Add New Hospitalisation</Title>
      </h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <InputLabel shrink>Entry Date</InputLabel>
          </Col>
          <Col md={3}>
            <StyledTextField
              type="date"
              id="entryDate"
              style={{ width: '100%' }}
              variant="standard"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          <Col md={2}>
            <InputLabel shrink>Doctor Name</InputLabel>
          </Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <StyledTextField
                id="DoctorName"
                value={DoctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                variant="standard"
              />
            </FormControl>
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <InputLabel shrink>Release Date</InputLabel>
          </Col>
          <Col md={3}>
            <StyledTextField
              type="date"
              id="releaseDate"
              variant="standard"
              value={releaseDate}
              style={{ width: '100%' }}
              onChange={(e) => setReleaseDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          <Col md={2}>
            <InputLabel shrink>Hospital Name</InputLabel>
          </Col>
          <Col md={4}>
            <StyledTextField
              id="HospitalName"
              variant="standard"
              value={HospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <InputLabel shrink>Reasons</InputLabel>
          </Col>
          <Col md={9}>
            <StyledTextField
              id="Reasons"
              variant="standard"
              multiline
              rows={2}
              value={Reasons}
              onChange={(e) => setReasons(e.target.value)}
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

export default NewHospitalisationForm;
