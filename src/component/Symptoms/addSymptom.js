import React, { useState } from 'react';
import {
  Container, Checkbox, FormControlLabel, Button, FormControl, Snackbar, InputLabel, Select, MenuItem, Grid, styled
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import casesServices from '../../services/casesServices';

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '35px',
  width: '100px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});

const AddSymptomForm = ({ caseId, refresh }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [fever, setFever] = useState(false);
  const [hypothermia, setHypothermia] = useState(false);
  const [hemodynamicSigns, setHemodynamicSigns] = useState([]);
  const [respiratorySigns, setRespiratorySigns] = useState([]);
  const [neurologicalSigns, setNeurologicalSigns] = useState([]);
  const [cutaneousSigns, setCutaneousSigns] = useState([]);
  const [digestiveSigns, setDigestiveSigns] = useState([]);
  const [gravity, setGravity] = useState('');

  console.log('caseId:', caseId);

  const symptomData = {
    fever,
    hypothermia,
    hemodynamicSigns,
    respiratorySigns,
    neurologicalSigns,
    cutaneousSigns,
    digestiveSigns,
    gravity
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting symptoms:', { caseId, symptomData });
      await casesServices.addSymptom(caseId, symptomData);
      setFever(false);
      setHypothermia(false);
      setHemodynamicSigns([]);
      setRespiratorySigns([]);
      setNeurologicalSigns([]);
      setCutaneousSigns([]);
      setDigestiveSigns([]);
      setGravity('');
      setSuccessMessage('Symptôme Ajouté Avec Succé!');
      setOpenSnackbar(true);
      refresh();
    } catch (error) {
      console.error('Error adding symptom:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="form" style={{ marginTop: '0px' }} fullWidth onSubmit={handleSubmit}>
      <FormControlLabel
        control={<Checkbox name="fièvre" checked={fever} onChange={(e) => setFever(e.target.checked)} />}
        label="fièvre"
      />
      <FormControlLabel
        control={<Checkbox name="hypothermie" checked={hypothermia} onChange={(e) => setHypothermia(e.target.checked)} />}
        label="hypothermie"
      />  
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Signes hémodynamiques</InputLabel>
            <Select
              variant='standard'
              multiple
              value={hemodynamicSigns}
              onChange={(e) => setHemodynamicSigns(e.target.value)}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Hypertension">Hypertension</MenuItem>
              <MenuItem value="Hypotension">Hypotension</MenuItem>
              <MenuItem value="Tachycardie">Tachycardie</MenuItem>
              <MenuItem value="Bradycardie">Bradycardie</MenuItem>
              <MenuItem value="Normale">Normale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Signes respiratoires</InputLabel>
            <Select
              variant='standard'
              multiple
              value={respiratorySigns}
              onChange={(e) => setRespiratorySigns(e.target.value)}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Dyspnée">Dyspnée</MenuItem>
              <MenuItem value="Tachypnée">Tachypnée</MenuItem>
              <MenuItem value="Toux">Toux</MenuItem>
              <MenuItem value="Une respiration sifflante">Une respiration sifflante</MenuItem>
              <MenuItem value="Normale">Normale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Signes neurologiques</InputLabel>
            <Select
              variant='standard'
              multiple
              value={neurologicalSigns}
              onChange={(e) => setNeurologicalSigns(e.target.value)}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Saisies">Saisies</MenuItem>
              <MenuItem value="Mal de tête">Mal de tête</MenuItem>
              <MenuItem value="Vertiges">Vertiges</MenuItem>
              <MenuItem value="Normale">Normale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Signes cutanés</InputLabel>
            <Select
              variant='standard'
              multiple
              value={cutaneousSigns}
              onChange={(e) => setCutaneousSigns(e.target.value)}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Éruption cutanée">Éruption cutanée</MenuItem>
              <MenuItem value="Érythème">Érythème</MenuItem>
              <MenuItem value="Pétéchies">Pétéchies</MenuItem>
              <MenuItem value="Normale">Normale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <InputLabel>Signes digestifs</InputLabel>
            <Select
              variant='standard'
              multiple
              value={digestiveSigns}
              onChange={(e) => setDigestiveSigns(e.target.value)}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Vomissement">Vomissement</MenuItem>
              <MenuItem value="Diarrhée">Diarrhée</MenuItem>
              <MenuItem value="Constipation">Constipation</MenuItem>
              <MenuItem value="Douleur abdominale">Douleur abdominale</MenuItem>
              <MenuItem value="Normale">Normale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl fullWidth>
        <InputLabel>Gravité</InputLabel>
        <Select
          variant='standard'
          style={{ width: 200 }}
          value={gravity}
          onChange={(e) => setGravity(e.target.value)}
          fullWidth
        >
          <MenuItem value="Faible">Faible</MenuItem>
          <MenuItem value="Moyenne">Moyenne</MenuItem>
          <MenuItem value="Fort">Fort</MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginTop: '10%' }}>
        <ButtonStyled type="submit" style={{marginLeft:'85%'}}>
          Ajouter
        </ButtonStyled>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
           {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddSymptomForm;
