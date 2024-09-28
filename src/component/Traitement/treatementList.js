import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import casesServices from '../../services/casesServices';
import treatementservices from '../../services/treatementServices';
import { 
  Container, FormControl, Box, InputLabel, Select, MenuItem, Table, 
  IconButton, TableBody, TableCell, Typography , Grid, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogContent, Checkbox, DialogTitle, DialogActions, Snackbar 
} from '@mui/material';
import { useAuth } from '../authentification/AuthContext'; 
import MuiAlert from '@mui/material/Alert';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AddTreatmentForm from './addTreatementForm';
import Title from '../title/title'
const pediatricTypes = [
  'All', 'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique',
  'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique', 'Pathologies infectieuses pédiatriques',
  'Hépato-gastro-entérologie', 'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique',
  'Hématologie pédiatrique', 'Chirurgie pédiatrique', 'Urgences chirurgicales',
  'Intoxication chez l’enfant', 'Réanimation pédiatrique'
];

const Treatments = () => {
  const { userRole } = useAuth();
  const [treatments, setTreatments] = useState([]);
  const [pediatricType, setPediatricType] = useState('');
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [treatmentToDelete, setTreatmentToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      if (pediatricType) {
        try {
          const response = await casesServices.getCasesByPediatricType(pediatricType);
          setCases(response);
        } catch (err) {
          console.error(err);
          setCases([]);
        }
      }
    };
    fetchCases();
  }, [pediatricType]);

  useEffect(() => {
    const fetchTreatments = async () => {
      if (selectedCaseId) {
        try {
          const response = await casesServices.viewTreatments(selectedCaseId);
          setTreatments(response);
          console.log(response);
        } catch (err) {
          console.error(err);
          setTreatments([]);
        }
      }
    };
    fetchTreatments();
  }, [selectedCaseId, refresh]);

  const handleOpenDeleteDialog = (treatment) => {
    setTreatmentToDelete(treatment);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setTreatmentToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!treatmentToDelete) return;
    try {
      await treatementservices.deleteTreatement(treatmentToDelete._id);
      setTreatments(treatments.filter(t => t._id !== treatmentToDelete._id));
      setSuccessMessage('Traitement supprimé avec succès !!');
      setOpenSnackbar(true);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ marginTop: '3%' }}>
         <Grid item xs={12} >
          <Typography variant="h5" style={{ marginTop: '3%' }}>
            <Title>Liste des traitements </Title>
          </Typography>
      </Grid>


      <Box display="flex" alignItems="center" marginBottom="30px" style={{ marginLeft: '0%' , marginTop: '5%'}}>
        <FormControl>
          <InputLabel>Types Pédiatriques</InputLabel>
          <Select
            variant="standard"
            value={pediatricType}
            onChange={(e) => setPediatricType(e.target.value)}
            style={{ width: 250, marginLeft: '5%' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {pediatricTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {pediatricType && (
          <FormControl style={{ marginLeft: '5%' }}>
            <InputLabel>Case Informations</InputLabel>
            <Select
              variant="standard"
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              style={{ width: 500 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cases.map(caseItem => (
                <MenuItem key={caseItem._id} value={caseItem._id}>
                  {caseItem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {userRole === 'admin' && (
          <div style={{ marginLeft: '15%' }}>
            <IconButton onClick={() => setOpenAddDialog(true)}>
              <AddCircleOutlineIcon style={{ color: '#89CFF0', fontSize: '25px' }} />
            </IconButton>
          </div>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
              <TableCell><strong>Hospitalisation</strong></TableCell>
              <TableCell><strong>CardioRespiratoire</strong></TableCell>
              <TableCell><strong>Maintien Température</strong></TableCell> 
              <TableCell><strong>Medications</strong></TableCell>
              <TableCell><strong>Suivi</strong></TableCell>
              <TableCell><strong>Restrictions Alimentaires</strong></TableCell>
              {userRole === 'admin' && (
                <TableCell colSpan={2}><strong>Actions</strong></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.length > 0 ? (
              treatments.map(treatment => (
                <TableRow key={treatment._id}>
                  <TableCell><Checkbox checked={treatment.hospitalisation} disabled /></TableCell>
                  <TableCell><Checkbox checked={treatment.monitorageCardioRespiratoire} disabled /></TableCell>
                  <TableCell>{treatment.maintienTemperature}</TableCell>
                  <TableCell>   
                      
                  {treatment.medications.length > 0 ? (
    treatment.medications.map((med, index) => (
        <div key={index}>
            {med.medicament ? med.medicament.nom : 'Nom indisponible'} - {med.dosage} - {med.frequency}
        </div>
    ))
) : (
    'Aucune médication disponible'
)}
</TableCell>
                  <TableCell>{treatment.followUpInstructions}</TableCell>
                  <TableCell>{treatment.dietaryRestrictions}</TableCell>
                  {userRole === 'admin' && (
                    <>
                      <TableCell>
                        <IconButton color="success">
                          <PencilSquare />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDeleteDialog(treatment)} color="error">
                          <Trash />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Aucun traitement disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <em>Êtes-vous sûr de vouloir supprimer ce traitement ?</em>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Ajouter un Traitement</DialogTitle>
        <DialogContent>
          <AddTreatmentForm caseId={selectedCaseId} refresh={() => setRefresh(!refresh)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} color="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Treatments;
