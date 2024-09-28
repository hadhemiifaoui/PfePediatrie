import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { TextField, Alert, Select, MenuItem, InputLabel, Button } from '@mui/material';
import Title from '../../title/title';
import healthconditionservices from '../../../services/healthconditionServices';
import medicamentServices from '../../../services/medicamentServices';
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

const AddHealthConditionForm = ({childId , condition, onClose, patientId}) => {
  const [desease, setDesease] = useState('');
  const [diagnosticYear, setDiagnosticYear] = useState('');
  const [diagnosticMonth, setDiagnosticMonth] = useState('');
  const [diagnosticDay, setDiagnosticDay] = useState('');
  const [medications, setMedications] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [treatedBy, setTreatedBy] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await medicamentServices.getMeds();
        console.log('Fetched Medications:', response); 
        setMedications(response || []);
      } catch (error) {
        console.error('Failed to fetch medications:', error);
        setMedications([]);
      }
    };
    fetchMedications();
  }, []);

  useEffect(() => {
    if (condition) {
      setDesease(condition.desease);
      setDiagnosticYear(condition.diagnosticYear);
      setDiagnosticMonth(condition.diagnosticMonth);
      setDiagnosticDay(condition.diagnosticDay);
      setSelectedMedications(condition.medications);
      setTreatedBy(condition.treatedBy);
      setStatus(condition.status);
      setNotes(condition.notes);
    }
  }, [condition]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      desease,
      diagnosticYear,
      diagnosticMonth,
      diagnosticDay,
      medications: selectedMedications,
      status,
      treatedBy,
      notes,
      patient : patientId,
      child : childId
    };
    console.log('Data to be sent:', data);  
    try {
      await healthconditionservices.create(data);
      onClose();
      setSuccessMessage('Situation medicale crée avec succè!');
    } catch (error) {
      console.error('Error creating health condition:', error.response?.data || error);
      alert('Failed to create Health Condition.');
    }
  };

  const handleCancel = () => {
    setDesease('');
    setDiagnosticYear('');
    setDiagnosticMonth('');
    setDiagnosticDay('');
    setSelectedMedications([]);
    setTreatedBy('');
    setStatus('');
    setNotes('');
    setSuccessMessage('');
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Ajouter une nouvelle situation médicale</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {successMessage && (<Alert style={{ marginBottom: '16px', width: '300px' }}>{successMessage}</Alert>)}
          </Col>
        </Row>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Maladie</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="standard-basic"
              variant="standard"
              value={desease}
              onChange={(e) => setDesease(e.target.value)}
              placeholder="e.g. Type II Diabetes, Glaucoma, etc."
              style={{ width: '100%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={3}><InputLabel shrink>Diagnostiqué Le</InputLabel></Col>
          <Col xs={3}>
            <Select
              value={diagnosticYear}
              id="year-select"
              onChange={(e) => setDiagnosticYear(e.target.value)}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '100%' }}
            >
              <MenuItem value=""><em>Année</em></MenuItem>
              {[...Array(11)].map((_, i) => (
                <MenuItem key={2014 + i} value={2014 + i}><em>{2014 + i}</em></MenuItem>
              ))}
            </Select>
          </Col>
          <Col xs={3}>
            <Select
              value={diagnosticMonth}
              onChange={(e) => setDiagnosticMonth(e.target.value)}
              id="month-select"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '100%' }}
            >
              <MenuItem value=""><em>Mois</em></MenuItem>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <MenuItem key={month} value={month}><em>{month}</em></MenuItem>
              ))}
            </Select>
          </Col>
          <Col xs={2}>
            <Select
              value={diagnosticDay}
              id="day-select"
              onChange={(e) => setDiagnosticDay(e.target.value)}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '100%' }}
            >
              <MenuItem value=""><em>Jour</em></MenuItem>
              {[...Array(31)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}><em>{i + 1}</em></MenuItem>
              ))}
            </Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Statut</InputLabel></Col>
          <Col xs={4}>
            <Select
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '100%' }}
            >
              <MenuItem value="current"><em>Current</em></MenuItem>
              <MenuItem value="past"><em>Pasé</em></MenuItem>
            </Select>
          </Col>
          <Col xs={2}><InputLabel shrink>Treaté Par</InputLabel></Col>
          <Col xs={4}>
            <TextField
              fullWidth
              value={treatedBy}
              onChange={(e) => setTreatedBy(e.target.value)}
              id="treated-by"
              variant="standard"
              style={{ backgroundColor: '#fff' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Medicament</InputLabel></Col>
          <Col xs={10}>
            <Select
              id="medications"
              multiple
              value={selectedMedications}
              onChange={(e) => {
                const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                setSelectedMedications(value);
                console.log('Selected Medications:', value);  
              }}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '100%' }}
            >
              {medications.map((med) => (
                <MenuItem key={med._id} value={med._id}><em>{med.nom}</em></MenuItem>
              ))}
            </Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Notes</InputLabel></Col>
          <Col xs={10}>
            <TextField
              multiline
              fullWidth
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              variant="standard"
              style={{ backgroundColor: '#fff' }}
            />
          </Col>
        </Form.Group>
        <Row className="mt-4">
          <Col md={8} />
          <Col md={4} className="d-flex justify-content-end">
            <CancelButtonStyled variant="contained" onClick={onClose}>Annuler</CancelButtonStyled>
            <ButtonStyled type="submit" variant="contained">
              Sauvegarder
            </ButtonStyled>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddHealthConditionForm;
