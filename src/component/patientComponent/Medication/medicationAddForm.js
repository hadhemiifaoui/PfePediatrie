import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Title from '../../title/title';
import medicationServices from '../../../services/medicationServices';
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
const StyledTextField = styled(TextField)({
  borderRadius: '6px',
  width: '100%',
});

const NewMedicationForm = ({childId , patientId}) => {
 
   const [medicationName , setMedicationName] = useState('')
   const [formOfMedicine  , setFormMedicine ]= useState('')
   const [dosageQuantity , setDosageQauntity]  = useState('')
   const [dosageFrequency , setDosageFrequency]   = useState('')
   const [unit , setUnit] = useState('')
   const [when , setWhen ]     = useState('')
   const [notes , setNotes]   = useState('')
   const [startDate , setStartDate]    = useState('')
   const [endDate , setEndDate]    = useState('')
   const [medicineTakenFor , setMedicineTakenFor]   = useState('') 
   const [prescribedBy , setPrescribedBy]   = useState('')
 
   const data = {
    medicationName,
    formOfMedicine,
    dosageQuantity,
    unit,
    dosageFrequency,
    when,
    notes,
    startDate,
    endDate,
    medicineTakenFor,
    prescribedBy,
    patient: patientId,
    child : childId
   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await medicationServices.create(data);
      setMedicationName('')
      setFormMedicine('')
      setDosageQauntity('')
      setUnit('')
      setDosageFrequency('')
      setWhen('')
      setNotes('')
      setStartDate('')
      setEndDate('')
      setMedicineTakenFor('')
      setPrescribedBy('')
      alert('Medication created successfully!');
    } catch (error) {
      console.error('Error creating medication:', error);
      alert('Failed to create medication.');
    }
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Add New Medications</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Medication</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="medicationName"
              variant="standard"
              placeholder="e.g. Insulin, Panadol, etc."
              value={medicationName}
              onChange={(e)=>setMedicationName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Taken For</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="medicineTakenFor"
              variant="standard"
              placeholder="e.g Diabète"
              value={medicineTakenFor}
              onChange={(e)=>setMedicineTakenFor(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Form of Medication</InputLabel></Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <Select
                id="formOfMedicine"
                value={formOfMedicine}
                onChange={(e)=>setFormMedicine(e.target.value)}
                variant="standard"
              >
                <MenuItem value="Capsule">Capsule</MenuItem>
                <MenuItem value="Tablet">Tablet</MenuItem>
                <MenuItem value="Syrup">Syrup</MenuItem>
                <MenuItem value="Injection">Injection</MenuItem>
                <MenuItem value="Powder">Powder</MenuItem>
                <MenuItem value="Spray">Spray</MenuItem>
                <MenuItem value="Cream">Cream</MenuItem>
                <MenuItem value="Gel">Gel</MenuItem>
                <MenuItem value="Lotion">Lotion</MenuItem>
                <MenuItem value="MouthWash">Mouth Wash</MenuItem>
                <MenuItem value="Liquid">Liquid</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col md={2}><InputLabel shrink>Prescribed by</InputLabel></Col>
          <Col md={4}>
            <StyledTextField
              id="prescribedBy"
              variant="standard"
              placeholder="Dr"
              value={prescribedBy}
              onChange={(e)=>setPrescribedBy(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Dosage</InputLabel></Col>
          <Col md={2}>
            <StyledTextField
              id="dosageQuantity"
              variant="standard"
              placeholder="#"
              value={dosageQuantity}
              onChange={(e)=>setDosageQauntity(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          <Col md={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel shrink>Unit</InputLabel>
              <Select
                id="dosageUnit"
                value={unit}
                onChange={(e)=>setUnit(e.target.value)}

                variant="standard"
              >
                <MenuItem value="mg">mg</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="%">%</MenuItem>
                <MenuItem value="mg/ml">mg/ml</MenuItem>
                <MenuItem value="mcg/ml">mcg/ml</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col md={2}><InputLabel shrink>Frequency</InputLabel></Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <Select
                id="dosageFrequency"
                value={dosageFrequency}
                onChange={(e)=>setDosageFrequency(e.target.value)}
                variant="standard"
              >
                <MenuItem value="once daily">once daily</MenuItem>
                <MenuItem value="twice daily">twice daily</MenuItem>
                <MenuItem value="3 times daily">3 times daily</MenuItem>
                <MenuItem value="anytime">anytime</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>When</InputLabel></Col>
          <Col md={4}>
            <FormControl fullWidth variant="standard">
              <Select
                id="when"
                value={when}
                onChange={(e)=>setWhen(e.target.value)}
                variant="standard"
              >
                <MenuItem value="before meals">before meals</MenuItem>
                <MenuItem value="after meals">after meals</MenuItem>
                <MenuItem value="with meals">with meals</MenuItem>
                <MenuItem value="anytime">anytime</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Notes</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="otherInstructions"
              variant="standard"
              multiline
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Start Date</InputLabel></Col>
          <Col md={4}>
          <TextField
        type="date"
        label="Date Diagnosed"
        name="dateDiagnosed"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
          </Col>
          <Col md={2}><InputLabel shrink>End Date</InputLabel></Col>
          <Col md={4}>
          <TextField
        type="date"
        label="Date Diagnosed"
        name="dateDiagnosed"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8} />
          <Col md={4} className="d-flex justify-content-end">
            <CancelButtonStyled variant="contained" >Cancel</CancelButtonStyled>
            <ButtonStyled type="submit" variant="contained">
              Submit
            </ButtonStyled>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NewMedicationForm;
