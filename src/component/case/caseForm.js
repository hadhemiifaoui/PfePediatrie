import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Container, MenuItem, Snackbar ,styled ,  Select,
   InputLabel,} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CaseContext from '../../context/CaseContext';

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '10px',
  minHeight: '35px',
  width: '100px',
  alignSelf: 'center',
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
  width: '100px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
const CaseForm = ({ onClose , refresh }) => {
  const [title, setTitle] = useState('');
  const [dateOpened, setDateOpened] = useState('');
  const [status, setStatus] = useState('Fermé');
  const [notes, setNotes] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [pediatricType, setPediatricType] = useState('Neonatologie');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { addCase } = useContext(CaseContext);

  const handleAddCase = async (e) => {
    e.preventDefault();

    const newCaseData = {
      title,
      dateOpened,
      status,
      severity,
      notes,
      description,
      pediatricType,
    };

    console.log('Adding new case with data:', newCaseData);

    try {
      const response = await addCase(newCaseData);
      console.log('Added case:', response);
      setSnackbarMessage('Cas Clinique Ajouté avec Succé!!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      refresh();
      setTitle('');
      setDateOpened('');
      setStatus('Fermé');
      setNotes('');
      setSeverity('')
      setDescription('');
      setPediatricType('Neonatologie');

      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }, 2000);
    } catch (error) {
      console.error('Failed to add case:', error);
      setSnackbarMessage('Failed to add case: ' + (error.response?.data?.message || 'An unexpected error occurred'));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '0px', maxWidth: '1200px' }}>
      <form onSubmit={handleAddCase} >
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Titre"
              variant="standard"
               style={{width:"80%"}}
              required
              InputLabelProps={{ shrink: true }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              name="dateOpened"
              label="Crée Le"
              type="date"
               variant="standard"
               style={{width:"40%"}}
              required
              InputLabelProps={{ shrink: true }}
              value={dateOpened}
              onChange={(e) => setDateOpened(e.target.value)}
             
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="status"
              select
              label="Status"
                variant="standard"
                style={{width:"50%"}}
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {['Ouverte', 'Fermé'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="pediatricType"
              select
              label="Type Pédiatrique"
                variant="standard"
                style={{width:"75%"}}
              required
              InputLabelProps={{ shrink: true }}
              value={pediatricType}
              onChange={(e) => setPediatricType(e.target.value)}
            >
              {[
                'Neonatologie',
                'Pneumologie pédiatrique',
                'Cardiologie pédiatrique',
                'Oto-rhino-laryngologie pédiatrique',
                'Neurologie pédiatrique',
                'Pathologies infectieuses pédiatriques',
                'Hépato-gastro-entérologie',
                'Endocrinologie',
                'Nephrologie',
                'Dermatologie pédiatrique',
                'Hématologie pédiatrique',
                'Chirurgie pédiatrique',
                'Urgences chirurgicales',
                'Intoxication chez l’enfant',
                'Réanimation pédiatrique',
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
          <InputLabel id="severity-label">Gravité</InputLabel>
      <Select
        labelId="severity-label"
        id="severity"
          variant="standard"
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        style={{width:"50%"}}
        required
        margin="normal"
      >
        <MenuItem value="Faible">Faible</MenuItem>
        <MenuItem value="Moyenne">Moyenne</MenuItem>
        <MenuItem value="Fort">Fort</MenuItem>
      </Select>
        </Grid>    
        <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              multiline
              rows={2}
                variant="standard"
                style={{width:"100%"}}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notes"
               variant="standard"
               style={{width:"100%"}}
              multiline
              rows={2}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
      
          <Grid item xs={12}>
          <div style={{ marginTop: '10%' , marginLeft:'73%' }}>
        <CancelButtonStyled  onClick={onClose}>Annuler</CancelButtonStyled>
        <ButtonStyled type="submit" >
          Ajouter
        </ButtonStyled>
      </div>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
   </Container>
  );
};

export default CaseForm;
