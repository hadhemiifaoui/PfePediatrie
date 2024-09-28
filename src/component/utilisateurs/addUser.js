import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, styled, InputLabel, FormControl, Select, MenuItem, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import Title from '../title/title';
import userServices from '../../services/userServices';

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

const NewUserForm = ({ handleClose }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('');
  const [tel, setTel] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userServices.signUp({ firstname, lastname, email, password, birthday, role, tel });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setBirthday('');
      setRole('');
      setTel('');
      setSuccessMessage('Utilisateur crée avec succé');
      setOpenSnackBar(true);
    //  handleClose();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <h4 style={{ marginBottom: '20px' }}><Title>Ajouter Nouvelle utilisateur</Title></h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2 align-items-center">
          <Col xs={2}>
            <InputLabel shrink>Nom</InputLabel>
          </Col>
          <Col xs={10}>
            <StyledTextField
              id="firstname"
              variant="standard"
              style={{ width: "35%" }}
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
          <Col xs={2}>
            <InputLabel shrink>Prénom</InputLabel>
          </Col>
          <Col xs={10}>
            <StyledTextField
              id="lastname"
              variant="standard"
              style={{ width: "35%" }}
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Email</InputLabel></Col>
          <Col xs={10}>
            <FormControl fullWidth >
              <StyledTextField
                id="email"
                value={email}
                variant="standard"
                placeholder='user@gmail.com'
                style={{ width: 380 }}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Mot de Pass</InputLabel></Col>
          <Col xs={10}>
            <StyledTextField
              id="password"
              type='password'
              variant="standard"
              style={{ width: 380 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Date du naissance</InputLabel></Col>
          <Col xs={10}>
            <StyledTextField
              id="birthday"
              type='date'
              variant="standard"
              style={{ width: 380 }}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Role</InputLabel></Col>
          <Col xs={10}>
            <FormControl fullWidth variant="standard">
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: 380 }}
                displayEmpty
              >
                <MenuItem value="">
                  <smallText>Séléctionner une role</smallText>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="pediatre">Pediatre</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row className="mb-2 align-items-center">
          <Col xs={2}><InputLabel shrink>Tel</InputLabel></Col>
          <Col xs={10}>
            <StyledTextField
              id="tel"
              variant="standard"
              style={{ width: 380 }}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4} style={{ marginLeft: '68%' }}>
            <CancelButtonStyled onClick={handleCancel}>Annuler</CancelButtonStyled>
            <ButtonStyled type="submit">Sauvegarder</ButtonStyled>
          </Col>
        </Row>
      </Form>

      <Snackbar
        open={openSnackBar}
        onClose={handleCloseSnackBar} autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackBar} severity='success' sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default NewUserForm;
