import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import diagnosticservices from '../../services/diagnoticServices';
import Title from '../title/title';
import { styled, MenuItem, IconButton, Snackbar } from '@mui/material';
//import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { Row, Col } from 'react-bootstrap';
const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
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
  fontSize: '12px',
  minHeight: '15px',

  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});


const EditDiagnosticForm = ({ open, onClose, diagnostic, onUpdate , refresh}) => {
  const [editedDiagnostic, setEditedDiagnostic] = useState({ ...diagnostic });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDiagnostic((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await diagnosticservices.updateDiagnostic(editedDiagnostic._id, editedDiagnostic);
      onUpdate(editedDiagnostic);
      setSuccessMessage('Diagnostique Mis a Jour Avec Succé');
      refresh();
      setOpenSnackbar(true);
    } catch (err) {
      setError('Failed to update diagnostic. Please try again.');
      console.error('Failed to update diagnostic', err);
    }
  };

  const handleCancel = () =>{
    onClose();
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  
  if (!diagnostic) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Title>Modifier le diagnostique</Title>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Risques liés aux facteurs"
          fullWidth
          multiline
          variant="standard"
          margin="normal"
          name="factorsRisks"
          value={editedDiagnostic.factorsRisks}
          onChange={handleChange}
        />
        <TextField
          label="Nom de cas clinique"
          fullWidth
          margin="normal"
          variant="standard"
          name="name"
          value={editedDiagnostic.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          variant="standard"
          margin="normal"
          name="description"
          value={editedDiagnostic.description}
          onChange={handleChange}
        />
      <TextField
          label="Plan du traitement"
          fullWidth
          margin="normal"
          variant="standard"
          name="treatmentPlan"
          value={editedDiagnostic.treatmentPlan}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          label="Gravité"
          variant="standard"
          style={{ width: 200 }}
          margin="normal"
          select
          name="severity"
          value={editedDiagnostic.severity}
          onChange={handleChange}
        >
          <MenuItem value="Faible">Faible</MenuItem>
          <MenuItem value="Moyenne">Moyenne</MenuItem>
          <MenuItem value="Fort">Fort</MenuItem>
        </TextField>
      
       <TextField
          label="status"
          variant="standard"
          style={{ width: 200 , marginLeft: '20%'}}
          margin="normal"
          select
          name="status"
          value={editedDiagnostic.status}
          onChange={handleChange}
        >
          
              <MenuItem value="confirmé">Actif</MenuItem>
              <MenuItem value="rejeté">Inactif</MenuItem>
              <MenuItem value="en attente">En attente</MenuItem>
              </TextField>
          

              <Row>
              <Col xs={4} style={{ marginLeft: '68%' , marginTop:'4%' }}>
                <CancelButtonStyled onClick={handleCancel} color="primary" style={{width:100,height:32}}>
                      Annuler
                </CancelButtonStyled>            
                <ButtonStyled onClick={handleSave} color="primary" style={{ width:100 }}>
                     Modifier
               </ButtonStyled>
            </Col></Row>
       
      </DialogContent>
      <DialogActions>
       
      </DialogActions>

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

    </Dialog>
  );
};

export default EditDiagnosticForm;

  /* <TextField
          label="Plan du traitement"
          fullWidth
          margin="normal"
          variant="standard"
          name="treatmentPlan"
          value={editedDiagnostic.treatmentPlan}
          onChange={handleChange}
          multiline
          rows={4}
        />*/