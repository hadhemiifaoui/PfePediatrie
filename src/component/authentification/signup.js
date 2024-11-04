import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, 
  Typography, Box, Checkbox, FormControlLabel, Snackbar, Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import Title from '../title/title';
import { useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';



const Container = styled(Box)({
  width: 650, 
  height:"100%",
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const FormControlStyled = styled(FormControl)({
  marginBottom: '10px',
  width: '100%',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px', 
  fontSize: '12px', 
  minHeight: '30px', 
  width: '150px', 
  alignSelf: 'center', 
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});

const Terms = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
});

const SignInLink = styled(Typography)({
  marginTop: '10px',
  textAlign: 'center',
});

const Signup = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
   
  const { t } = useTranslation();




  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!firstname) formErrors.firstname = t('nameerror');
    if (!lastname) formErrors.lastname = t('lastnameerror');
    if (!email) {
      formErrors.email = t('emailerror');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email =  t('emailInvalid');
    }
    if (!password) {
      formErrors.password = t('passworderror');
    } else if (password.length < 6) {
      formErrors.password = t('passwordLenghterror');
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = t('passwrdDiffrenceError');
    }
    if (!tel) formErrors.tel = t('phoneerror');
    if (!role) formErrors.role = t('roleerror');
    return formErrors;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await userServices.signUp({ firstname, lastname, email, password, birthday, role, tel });
        console.log(response.data);
        setSuccessMessage('Utilisateur inscrit avec succé');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      
        setTimeout(() => {
          navigate('/login');
        }, 3000); 

      } 
      catch (error) {
        console.error('Registration Error:', error);
          setErrors({});
  
        let errorMessage = 'Something went wrong';
  
        if (error.response) {
          if (error.response.data?.message === 'This email already exists') {
            errorMessage = 'Cet utilisateur existe déjà';
          } else if (error.response.data?.message === 'This password already exists') {
            errorMessage = 'Essayez un autre mot de passe';
          } else {
            errorMessage = error.response.data?.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'No response from server';
        } else {
          errorMessage = error.message || 'Something went wrong';
        }
  
        setSuccessMessage(''); 
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setErrors({}); 
        setSuccessMessage(errorMessage);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container >
      <Title>{t('signupTilte')}</Title>
      <Form onSubmit={handleSignUp}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('emailLabel')}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.email && <MuiAlert severity="error">{errors.email}</MuiAlert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('phoneNumberLabel')}
              name="phone"
              value={tel}
              fullWidth
              onChange={(e) => setTel(e.target.value)}
              margin="normal"
            />
            {errors.tel && <MuiAlert severity="error">{errors.tel}</MuiAlert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('firstNameLabel')}
              name="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.firstname && <MuiAlert severity="error">{errors.firstname}</MuiAlert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('lastNameLabel')}
              name="lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.lastname && <MuiAlert severity="error">{errors.lastname}</MuiAlert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.birthday && <MuiAlert severity="error">{errors.birthday}</MuiAlert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlStyled fullWidth margin="normal">
              <InputLabel>{t('RoleLabel')}</InputLabel>
              <Select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
              >
               
                <MenuItem value="pediatre">Pediatre</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
              {errors.role && <MuiAlert severity="error">{errors.role}</MuiAlert>}
            </FormControlStyled>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('createPassLabel')}
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.password && <MuiAlert severity="error">{errors.password}</MuiAlert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('confirmPassLabel')}
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {errors.confirmPassword && <MuiAlert severity="error">{errors.confirmPassword}</MuiAlert>}
          </Grid>
          <Grid item xs={12}>
          <Row> <Col> <FormControlLabel
              control={
                <Checkbox
                  name="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
              }
              label={t('CheckBoxLabel')}
              className={Terms}
            />
           </Col> </Row> 
          <Row> 
            <Col><ButtonStyled type="submit" variant="contained" >{t('buttonLabel')}</ButtonStyled></Col>
                  <Snackbar open={openSnackbar} autoHideDuration={6000}   onClose={handleSnackbarClose}
                       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                     <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '25%', marginLeft:"50%" }}>
                          {successMessage}
                    </MuiAlert>
                  </Snackbar>
             <Col><SignInLink variant="body2">{t('HaveAccountText')}<a href="/login">{t('SignInText')}</a></SignInLink></Col>
          </Row>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export default Signup;


// <MenuItem value="admin">Admin</MenuItem>