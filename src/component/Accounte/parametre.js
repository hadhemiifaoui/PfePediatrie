import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,styled
  
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userServices from '../../services/userServices';
import Title from '../title/title';

const ButtonStyled = styled(Button)({
  backgroundColor: '#8051cd',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '120px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#8051cd',
  },
});


const ButtonStyledAnnul = styled(Button)({
  backgroundColor: '#b7950b',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '120px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#b7950b',
  },
});

const Settings = () => {
  const [email, setEmail] = useState('');

  const [editOpen, setEditOpen] = useState(false);


  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current Password is required'),
      newPassword: Yup.string().required('New Password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await userServices.changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        alert('Password changed successfully');
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password');
      }
    }
  });

  


  const handleDeleteAccount = async () => {
    try {
      await userServices.deleteAccount(email);
      alert('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  



  return (
    <Box p={3} style={{marginTop:-120 , marginLeft : -180 , widh:20}}>
      <Typography variant="h5" gutterBottom>
         <Title>  Paramètres générale de compte</Title>
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }} > 
        <Grid container spacing={2} mt={3} >
          <Grid item xs={12} style={{marginTop:-40 , marginLeft:10}}>
            <Typography variant="h6">Modifier Votre Mot De Passe</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <Grid item xs={12} style={{marginTop:-10}}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="currentPassword"
                name="currentPassword"
                label="Mot de passe Actuel"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                margin="normal"
              />
              <TextField
                fullWidth
                id="newPassword"
                name="newPassword"
                label="Nouvel mot de passe"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                margin="normal"
              />
              <TextField
                fullWidth
                id="confirmNewPassword"
                name="confirmNewPassword"
                label="Confirmer votre nouvel mot de passe"
                type="password"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                margin="normal"
              />
                  <Box style={{marginLeft:"60%"}}>
                  <ButtonStyledAnnul  onClick={() => setEditOpen(false)}>
                   Annuler
              </ButtonStyledAnnul>

             
                <span>  </span>
                <ButtonStyled variant="contained" fullWidth type="submit" >
                Modifier 
              </ButtonStyled>
              </Box>
            </form>
          </Grid>

          
          
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;

/*<Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
            >
              Supprimer le compte
            </Button>
          </Grid>
          */
