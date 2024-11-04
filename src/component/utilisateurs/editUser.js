import React, { useEffect, useState } from "react";
import userServices from '../../services/userServices';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, InputLabel,styled , Snackbar, Select, MenuItem } from '@mui/material';
import Title from '../title/title';
import MuiAlert from '@mui/material/Alert';

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

const EditUser = ({ initialData ,handleClose  , refresh}) => {
  const [formData, setFormData] = useState({
    firstname: initialData.firstname || '',
    lastname: initialData.lastname || '',
    email: initialData.email || '',
    password: initialData.password || '',
    birthday: initialData.birthday ? initialData.birthday.substring(0, 10) : '',
    role: initialData.role || '',
    tel: initialData.tel || '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setFormData({
      firstname: initialData.firstname || '',
      lastname: initialData.lastname || '',
      email: initialData.email || '',
      password: initialData.password || '',
      birthday: initialData.birthday ? initialData.birthday.substring(0, 10) : '',
      role: initialData.role || '',
      tel: initialData.tel || '',
    });
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateUser(initialData._id, { 
        ...formData, 
        birthday: formData.birthday ? formData.birthday.substring(0, 10) : '' 
      });
      setSuccessMessage('Utilisateur modifier avec succé !!');
      setOpenSnackbar(true);
      refresh()
    } catch (error) {
      console.error('Error Updating User !!');
      setError('Error updating User');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    handleClose();
  };


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Modifier Utilisateur</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col></Col>

        </Row>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Nom</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="firstname"
              name="firstname"
              variant="standard"
              value={formData.firstname}
              onChange={handleChange}
              style={{ width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Prénom</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="lastname"
              name="lastname"
              variant="standard"
              value={formData.lastname}
              onChange={handleChange}
              style={{ width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Email</InputLabel></Col>
          <Col xs={10}>
            <TextField
              id="email"
              name="email"
              variant="standard"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Mot de Pass</InputLabel></Col>
          <Col xs={10}>
            <TextField
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              id="password"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '30%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Date du Naissance</InputLabel></Col>
          <Col xs={10}>
            <TextField
             name="birthday"
             fullWidth
             type="date"
             value={formData.birthday}
             onChange={handleChange}
             id="birthday"
             variant="standard"
             style={{ backgroundColor: '#fff', width: '30%' }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Role</InputLabel></Col>
          <Col xs={10}>
            <Select
              fullWidth
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              variant="standard"
              style={{ backgroundColor: '#fff', width: '60%' }}
            >
              <MenuItem value="">
                <em>Séléctionner une role</em>
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="pediatre">Pediatre</MenuItem>
            </Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Tel</InputLabel></Col>
          <Col xs={10}>
            <TextField
              multiline
              fullWidth
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              id="tel"
              variant="standard"
              style={{ backgroundColor: '#fff', width: '60%' }}
            />
          </Col>
        </Form.Group>
        <Row>
          <Col xs={4} style={{ marginLeft: '68%' }}>
            <CancelButtonStyled onClick={handleCancel}>Annuler</CancelButtonStyled>
            <ButtonStyled type="submit">Sauvegarder</ButtonStyled>
          </Col>
        </Row>
      </Form>

      {successMessage && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </MuiAlert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditUser;
