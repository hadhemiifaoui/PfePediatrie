
import React, { useState } from 'react';
import { TextField, Button, Card, Container, Box, Typography, IconButton, CardContent, Alert } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from './AuthContext';
import userServices from './../../services/userServices';
import Title from '../title/title';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';

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

const SmallText = styled('span')({
  fontSize: 'smaller',
  marginLeft: '8px',
});

const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const validate = () => {
    let errorList = {};
    if (!email) {
      errorList.email = t('enterEmailError');
    }
    if (!password) {
      errorList.password = t('enterPasswordError');
    }
    return errorList;
  };
       
  const handleLogin = async (e) => {
    e.preventDefault();
    const errorList = validate();
  
    if (Object.keys(errorList).length === 0) {
      try {
        const response = await userServices.login({ email, password });
        const { data } = response;
        
        if (data?.message === 'Login successful') {
          const { token, role, _id } = data;
  
          localStorage.setItem('userid', _id); 
          localStorage.setItem('token', token); 
          localStorage.setItem('role', role);
  
          login(token, role, _id); 
          console.log('Redirecting to dashboard');
        } 
      } catch (err) {
        console.error('Login error:', err);
        
        if (err.response?.status === 404) {
          setError('cet utilisateur n`existe pas');
        } else if (err.response?.status === 400) {
          setError('mot de passe incorrecte');
        } else {
          setError(err.response?.data?.message || 'un autre erreur');
        }
      }
    } else {
      setError(errorList); 
    }
  };
  
  return (
    <Container maxWidth="md" style={{ maxWidth: '100%', marginTop: '20vh', height: '100vh' }}>
      <Card sx={{ 
         width: '100%', 
         maxWidth: 500, 
         marginLeft :'10%',
         height :'80vh',
         marginBottom: 2, 
         borderRadius: '8px', 
         boxShadow: '0px 3px 6px #00000029',
         padding: 2
      }}>
        <CardContent style={{ marginTop: '5%', height: '40vh' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            <Title>{t('loginTitle')}</Title>
          </Typography>
          <form onSubmit={handleLogin}>
            <IconContainer>
              <PersonIcon style={{ marginRight: '8px' }} />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label={t('emailLabel')}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </IconContainer>
            {error.email && <Alert severity="error">{error.email}</Alert>}
            <IconContainer>
              <LockIcon style={{ marginRight: '8px' }} />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label={t('passwordLabel')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />   
            </IconContainer>
            {error.password && <Alert severity="error">{error.password}</Alert>}

            {error && typeof error === 'string' && <Alert severity="error">{error}</Alert>}
          
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '30px', padding: '0 8%' }}>
                <ButtonStyled style={{ display: 'flex', alignItems: 'center', width: '33%', height: '5vh' }} type="submit" variant="contained">
                  <PersonIcon style={{ marginRight: '8px' }} /> {t('loginButton')}
                </ButtonStyled>
                <SmallText>{t('noAccountText')} <a href="/signup">{t('signupText')}</a></SmallText>
            </div>
          </form>
        </CardContent>

        <Box sx={{ textAlign: 'center', mt: 4, marginTop: '25%' }}> 
          <SmallText variant="body1" gutterBottom>{t('orSignupUsing')}</SmallText>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <IconButton style={{ backgroundColor: '#3b5998', color: '#fff' }}>
                <FacebookIcon />
              </IconButton>
            </a>
            <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
              <IconButton style={{ backgroundColor: '#1da1f2', color: '#fff' }}>
                <TwitterIcon />
              </IconButton>
            </a>
            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
              <IconButton style={{ backgroundColor: '#db4437', color: '#fff' }}>
                <GoogleIcon />
              </IconButton>
            </a>
          </Box> 
        </Box>           
      </Card>
    </Container>
  );
};

export default Login;
