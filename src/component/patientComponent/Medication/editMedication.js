
import { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, styled, InputLabel, FormControl, Snackbar, Select, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Title from '../../title/title';
import medicationservices from '../../../services/medicationServices';

const StyledTextField = styled(TextField)({
  borderRadius: '6px',
  width: '100%',
});

const EditForm = ({ initialValues }) => {
  const [formData, setFormData] = useState({
    medicationName: initialValues.medicationName || '',
    formOfMedicine: initialValues.formOfMedicine || '',
    dosageQuantity: initialValues.dosageQuantity || '',
    dosageFrequency: initialValues.dosageFrequency || '',
    unit: initialValues.unit || '',
    when: initialValues.when || '',
    notes: initialValues.notes || '',
    startDate: initialValues.startDate ? initialValues.startDate.split('T')[0] : '',
    endDate: initialValues.endDate ? initialValues.endDate.split('T')[0] : '',
    medicineTakenFor: initialValues.medicineTakenFor || '',
    prescribedBy: initialValues.prescribedBy || '',
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
      await medicationservices.update(initialValues._id, formData);
      setSuccessMessage('Medication Updated Successfully');
      setOpenSnackbar(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update Medication. Please try again.');
      }
      console.error('Error updating medication:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Edit Medication</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Medication</InputLabel></Col>
          <Col md={10}>
            <StyledTextField
              id="medicationName"
              variant="standard"
              placeholder="e.g. Insulin, Panadol, etc."
              value={formData.medicationName}
              onChange={handleChange}
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
              value={formData.medicineTakenFor}
              onChange={handleChange}
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
                name="formOfMedicine"
                value={formData.formOfMedicine}
                onChange={handleChange}
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
              name="prescribedBy"
              variant="standard"
              placeholder="Dr"
              value={formData.prescribedBy}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Dosage</InputLabel></Col>
          <Col md={2}>
            <StyledTextField
              id="dosageQuantity"
              name="dosageQuantity"
              variant="standard"
              placeholder="#"
              value={formData.dosageQuantity}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          <Col md={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel shrink>Unit</InputLabel>
              <Select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
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
                name="dosageFrequency"
                value={formData.dosageFrequency}
                onChange={handleChange}
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
                name="when"
                value={formData.when}
                onChange={handleChange}
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
              id="notes"
              name="notes"
              variant="standard"
              multiline
              value={formData.notes}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col md={2}><InputLabel shrink>Start Date</InputLabel></Col>
          <Col md={4}>
            <TextField
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
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
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Update
          </Button>
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
