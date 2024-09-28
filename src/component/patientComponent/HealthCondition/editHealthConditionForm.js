
import { useState, useEffect } from "react";
import healthconditionservices from "../../../services/healthconditionServices";
import medicamentServices from '../../../services/medicamentServices';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, InputLabel, Alert, Snackbar, Select, MenuItem } from '@mui/material';
import Title from '../../title/title';
import MuiAlert from '@mui/material/Alert';
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



const EditForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    desease: initialData.desease || '',
    diagnosticYear: initialData.diagnosticYear || '',
    diagnosticMonth: initialData.diagnosticMonth || '',
    diagnosticDay: initialData.diagnosticDay || '',
    medications: initialData.medications  || [],
    treatedBy: initialData.treatedBy || '',
    status: initialData.status || '',
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
      desease: initialData.desease || '',
      diagnosticYear: initialData.diagnosticYear || '',
      diagnosticMonth: initialData.diagnosticMonth || '',
      diagnosticDay: initialData.diagnosticDay || '',
      medications: initialData.medications ? initialData.medications.map(med => med._id) : [],
      treatedBy: initialData.treatedBy || '',
      status: initialData.status || '',
      notes: initialData.notes || '',
    });
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await healthconditionservices.update(initialData._id, formData);
      setSuccessMessage('Situation medicale mettre a jour avec succè!!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error Updating Health Condition !!');
      setError('Error updating health condition');
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
      <h4 style={{ marginBottom: '20px' }}><Title>Modifier Situation Medicale</Title></h4>
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
              value={formData.desease}
              onChange={handleChange}
              name="desease"
              placeholder="e.g. Type II Diabetes, Glaucoma, etc."
              style={{ width: '100%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={3}><InputLabel shrink>Diagnostiqué Le </InputLabel></Col>
          <Col xs={3}>
            <Select
              id="year-select"
              value={formData.diagnosticYear}
              onChange={handleChange}
              name="diagnosticYear"
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
              value={formData.diagnosticMonth}
              onChange={handleChange}
              name="diagnosticMonth"
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
              id="day-select"
              value={formData.diagnosticDay}
              onChange={handleChange}
              name="diagnosticDay"
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
              value={formData.status}
              onChange={handleChange}
              name="status"
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
              value={formData.treatedBy}
              onChange={handleChange}
              name="treatedBy"
              id="treated-by"
              variant="standard"
              style={{ backgroundColor: '#fff' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Medicaments</InputLabel></Col>
          <Col xs={10}>
          <Select
                id="medications"
                multiple
                value={formData.medications}
                onChange={handleMedicationChange}
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
              value={formData.notes}
              onChange={handleChange}
              name="notes"
              id="notes"
              variant="standard"
              style={{ backgroundColor: '#fff' }}
            />
          </Col>
        </Form.Group>
        <Row className="mt-4">
          <Col md={8} />
          <Col md={4} className="d-flex justify-content-end">
            <CancelButtonStyled variant="contained">Annuler</CancelButtonStyled>
            <ButtonStyled type="submit" variant="contained">
               Sauvegarder
            </ButtonStyled>
          </Col>
        </Row>
      </Form>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
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
