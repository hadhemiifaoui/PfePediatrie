import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, Alert, Select, MenuItem, InputLabel } from '@mui/material';
import Title from '../../title/title';
import allergyservices from '../../../services/allergyServices';
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



const AddNewAllergyForm = ({patientId , childId , refresh}) => {
  const [name, setName] = useState('');
  const [triggeredBy, setTriggeredBy] = useState('');
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [reaction, setReaction] = useState('');
  //const [firstNoted, setFirstNoted] = useState('');
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

  const data = {
    name,
    triggeredBy,
    medications: selectedMedication,
    lastUpdated,
    reaction,
    //firstNoted,
    notes,
    patient : patientId,
    child: childId
  };
 console.log(data)
  const submit = async (e) => {
    e.preventDefault();
    try {
      await allergyservices.create(data);
      setName('');
      setTriggeredBy('');
      setSelectedMedication([]);
      setLastUpdated('');
      setReaction('');
     //setFirstNoted('');
      setNotes('');
      setSuccessMessage('Allergy Created Successfully !!');
      refresh();
    } catch (error) {
      console.error('Error Creating Allergy');
    }
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}>
        <Title>Ajouter nouvelle allergie</Title>
      </h4>
      <Form onSubmit={submit}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {successMessage && (
              <Alert style={{ marginBottom: '16px', width: '300px' }}>
                {successMessage}
              </Alert>
            )}
          </Col>
        </Row>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Nom :</InputLabel>
          </Col>
          <Col xs={10}>
            <TextField
              id="standard-basic"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Type II Diabetes, Glaucoma,..."
              style={{ width: '65%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={3}>
            <InputLabel shrink>Déclenché par :</InputLabel>
          </Col>
          <Col xs={9}>
            <TextField
              value={triggeredBy}
              variant="standard"
              id="standard-basic"
              onChange={(e) => setTriggeredBy(e.target.value)}
              style={{ backgroundColor: '#fff', width: '65%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Medicaments :</InputLabel>
          </Col>
          <Col xs={10}>
            <Select
              id="medications"
              multiple
              value={selectedMedication}
              onChange={(e) => {
                const value =
                  typeof e.target.value === 'string'
                    ? e.target.value.split(',')
                    : e.target.value;
                setSelectedMedication(value);
                console.log('Selected Medications:', value);
              }}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '70%' }}
            >
              {medications.map((med) => (
                <MenuItem key={med._id} value={med._id}>
                  <em>{med.nom}</em>
                </MenuItem>
              ))}
            </Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Dernière mise à jour</InputLabel>
          </Col>
          <Col xs={10}>
            <TextField
              fullWidth
              type="date"
              value={lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
              id="last-updated"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '30%' }}
            />
          </Col>
        </Form.Group>
    
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Réaction</InputLabel>
          </Col>
          <Col xs={10}>
            <TextField
              fullWidth
              value={reaction}
              onChange={(e) => setReaction(e.target.value)}
              id="reaction"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '70%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Notes</InputLabel>
          </Col>
          <Col xs={10}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              variant="standard"
              style={{ backgroundColor: '#fff' , width:'70%'}}
            />
          </Col>
        </Form.Group>
        <Row className="mt-4">
          <Col md={8} />
          <Col md={4} className="d-flex justify-content-end">
           
            <ButtonStyled type="submit" variant="contained">
              Enregistrer
            </ButtonStyled>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default AddNewAllergyForm;

/* <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>First Noted</InputLabel>
          </Col>
          <Col xs={10}>
            <TextField
              fullWidth
              type="date"
              value={firstNoted}
              onChange={(e) => setFirstNoted(e.target.value)}
              id="first-noted"
              variant="standard"
              style={{ backgroundColor: '#fff' , width: '30%'}}
            />
          </Col>
        </Form.Group>  


         <CancelButtonStyled variant="contained">Annuler</CancelButtonStyled>

         
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
*/