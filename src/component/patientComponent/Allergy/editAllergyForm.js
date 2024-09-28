import { useState, useEffect } from "react";
import allergyServices from "../../../services/allergyServices";
import medicamentServices from '../../../services/medicamentServices';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, InputLabel, Alert, Snackbar, Select, MenuItem } from '@mui/material';
import Title from '../../title/title';
import MuiAlert from '@mui/material/Alert';

const EditForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    triggeredBy: initialData.triggeredBy || '',
    medications: initialData.medications  || [],
    lastUpdated: initialData.lastUpdated || '',
    reaction: initialData.reaction || '',
    firstNoted: initialData.firstNoted || '',
    notes: initialData.notes || '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [medications, setMedications] = useState([]);

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
    setFormData({
      name: initialData.name || '',
      triggeredBy: initialData.triggeredBy || '',
      medications: initialData.medications ? initialData.medications.map(med => med._id) : [],
      lastUpdated: initialData.lastUpdated || '',
      reaction: initialData.reaction || '',
      firstNoted: initialData.firstNoted || '',
      notes: initialData.notes || '',
    });
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await allergyServices.update(initialData._id, formData);
      setSuccessMessage('Allergy updated successfully !!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error Updating Allergy !!');
      setError('Error updating Allergy');
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMedicationChange = (e) => {
    setFormData({
      ...formData,
      medications: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Edit Allergy</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {successMessage && (<Alert style={{ marginBottom: '16px', width: '300px' }}>{successMessage}</Alert>)}
          </Col>
        </Row>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Name</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="name"
              name="name"
              variant="standard"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Triggered By</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="triggeredBy"
              name="triggeredBy"
              variant="standard"
              value={formData.triggeredBy}
              onChange={handleChange}
              style={{ width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Medications</InputLabel></Col>
          <Col xs={10}>
            <Select
              id="medications"
              name="medications"
              multiple
              value={formData.medications}
              onChange={handleMedicationChange}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '60%' }}
            >
              {medications.map((med) => (
                <MenuItem key={med._id} value={med._id}><em>{med.nom}</em></MenuItem>
              ))}
            </Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Last Updated</InputLabel></Col>
          <Col xs={10}>
            <TextField
              type="date"
              name="lastUpdated"
              fullWidth
              value={formData.lastUpdated}
              onChange={handleChange}
              id="lastUpdated"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '30%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>First Noted</InputLabel></Col>
          <Col xs={10}>
            <TextField
              type="date"
              name="firstNoted"
              fullWidth
              value={formData.firstNoted}
              onChange={handleChange}
              id="firstNoted"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '30%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Reaction</InputLabel></Col>
          <Col xs={10}>
            <TextField
              fullWidth
              name="reaction"
              value={formData.reaction}
              onChange={handleChange}
              id="reaction"
              variant="standard"
              style={{ backgroundColor: '#fff' , width: '85%'}}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Notes</InputLabel></Col>
          <Col xs={10}>
            <TextField
              multiline
              fullWidth
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              id="notes"
              variant="standard"
              style={{ backgroundColor: '#fff' , width: '85%'}}
            />
          </Col>
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
          <Button
            type="submit"
            variant="primary"
            style={{ marginRight: '10px' }}
          >
            Save
          </Button>
        </div>
      </Form>
      {error && (
        <Snackbar
          autoHideDuration={6000}
          open={openSnackbar}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
            {error}
          </MuiAlert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditForm;
