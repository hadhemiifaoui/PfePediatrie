import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddSymptomForm from './addSymptom';
import CloseIcon from '@mui/icons-material/Close';
import Title from '../title/title';
import casesServices from '../../services/casesServices';
import EditSymptomForm from './editSymptoms';
import symptomsServices from '../../services/symptomsServices';
//import { Link } from 'react-router-dom';
import { Container, Grid , FormControl,Typography, Box, InputLabel, Select, MenuItem, Table, 
  IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
   Button, Checkbox, Dialog, DialogContent, DialogTitle, DialogActions, 
   Snackbar} from '@mui/material';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../authentification/AuthContext'; 
import MuiAlert from '@mui/material/Alert'

const pediatricTypes = [
  'All', 'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique',
  'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique', 'Pathologies infectieuses pédiatriques',
  'Hépato-gastro-entérologie', 'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique',
  'Hématologie pédiatrique', 'Chirurgie pédiatrique', 'Urgences chirurgicales',
  'Intoxication chez l’enfant', 'Réanimation pédiatrique'
];

const Symptoms = () => {
  const { userRole } = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [pediatricType, setPediatricType] = useState('');
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [symptomToDelete , setSymptomToDelete] = useState(null);
  const [openDeleteDialog , setOpenDeleteDialog] = useState(false);
  const [openSnackbar , setOpenSnackbar] = useState(null)
  const [successMessage , setSuccessMessage] = useState('')
  const [refresh , setRefresh] = useState(false)

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
    const fetchDiagnostics = async () => {
      if (selectedCaseId) {
        try {
          const response = await casesServices.viewSymptoms(selectedCaseId);
          if(userRole === "pediatre") {
            setSymptoms(response.filter(symptom => symptom.status === "confirmé"))
          }
          else{
            setSymptoms(response);
          }
          
        } catch (err) {
          console.error(err);
          setSymptoms([]);
        }
      }
    };
    fetchDiagnostics();
  }, [selectedCaseId]);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (selectedCaseId) {
        try {
          const response = await casesServices.viewSymptoms(selectedCaseId);
          setSymptoms(response);
        } catch (err) {
          console.error(err);
          setSymptoms([]);
        }
      }
    };
    fetchDiagnostics();
  },[refresh]);




  const handleOpenEditDialog = (symptom) => {
    setSelectedSymptom(symptom);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedSymptom(null);
    setOpenEditDialog(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenDeleteDialog = async (symptom) =>{
    setSymptomToDelete(symptom)
    setOpenDeleteDialog(true)
}

const handleCloseDeleteDialog = async () =>{
  setSymptomToDelete(null);
  setOpenDeleteDialog(false);
}

  const handleDelete = async () => {
   if(!symptomToDelete) return;
    try {
      await symptomsServices.removeSymptom(symptomToDelete._id);
      setSymptoms(symptoms.filter((symptom) => symptom._id !== symptomToDelete._id));
      setSuccessMessage('Symptôme  supprimé avec succès !!');
      setOpenSnackbar(true);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackBar = () =>{
    setOpenSnackbar(false)
  }

  return (
    <Container >
         
      <Grid item xs={12} >
          <Typography variant="h5" style={{ marginTop: '3%' }}>
            <Title>Liste des symptômes </Title>
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
            {pediatricTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {pediatricType && (
          <FormControl style={{ marginLeft: '5%' }}>
            <InputLabel>Pediatric Case Informations</InputLabel>
            <Select
              variant="standard"
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              style={{ width: 500 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cases.map((caseItem) => (
                <MenuItem key={caseItem._id} value={caseItem._id}>
                  {caseItem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        { (userRole === 'admin' || userRole === 'pediatre') && (
          <div style={{ marginLeft: '15%' }}>
            <IconButton onClick={handleOpenAddDialog}>
              <AddCircleOutlineIcon style={{ color: '#89CFF0', fontSize: '25px' }} />
            </IconButton>
          </div>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
              <TableCell><strong>Fièvre</strong></TableCell>
              <TableCell><strong>Hypothermie</strong></TableCell>
              <TableCell><strong>Signes hémodynamiques</strong></TableCell>
              <TableCell><strong>Signes Respiratoires</strong></TableCell>
              <TableCell><strong>Signes neurologiques</strong></TableCell>
              <TableCell><strong>Signes cutanés</strong></TableCell>
              <TableCell><strong>Signes digestifs</strong></TableCell>
              <TableCell><strong>Gravité</strong></TableCell>
              <TableCell><strong>Ajouté par</strong></TableCell>
              <TableCell><strong>Statut</strong></TableCell>
              {userRole === 'admin' && (
                <TableCell colSpan={2}><strong>Actions</strong></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {symptoms.length > 0 ? (
              symptoms.map((symptom) => (
                <TableRow key={symptom._id}>
                  <TableCell><Checkbox checked={symptom.fever} disabled /></TableCell>
                  <TableCell><Checkbox checked={symptom.hypothermia} disabled /></TableCell>
                  <TableCell>{symptom.hemodynamicSigns.join(', ')}</TableCell>
                  <TableCell>{symptom.respiratorySigns.join(', ')}</TableCell>
                  <TableCell>{symptom.neurologicalSigns.join(', ')}</TableCell>
                  <TableCell>{symptom.cutaneousSigns.join(', ')}</TableCell>
                  <TableCell>{symptom.digestiveSigns.join(', ')}</TableCell>
                  <TableCell>{symptom.gravity}</TableCell>
                  <TableCell> Dr {symptom.createdBy ? symptom.createdBy.firstname : 'Inconnue'}</TableCell> 
                  <TableCell>{symptom.status}</TableCell>
                  {userRole === 'admin' && (
                    <>
                      <TableCell style={{ padding: '0 4px' }}>
                        <IconButton onClick={() => handleOpenEditDialog(symptom)} color="success">
                          <PencilSquare />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ padding: '0 4px' }}>
                        <IconButton onClick={() => handleOpenDeleteDialog(symptom)} color="error">
                          <Trash />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                   Aucun symptôme disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
   
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Ajouter un nouveau symptôme</Title></DialogTitle>
        <DialogContent>
          <AddSymptomForm caseId={selectedCaseId} refresh={() => setRefresh(!refresh)} handleCloseAddDialog={handleCloseAddDialog} />
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Modifier le symptôme</Title></DialogTitle>
        <DialogContent>
          <EditSymptomForm symptom={selectedSymptom} handleCloseEditDialog={handleCloseEditDialog} caseId={selectedCaseId} refresh={() => setRefresh(!refresh)}/>
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer ce symptôme ?</em>
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
     
      <Snackbar 
       onClose={handleCloseSnackBar} open={openSnackbar} 
       autoHideDuration={2000}
       anchorOrigin={{vertical:'top' , horizontal:'right'}}>
           <MuiAlert onClose={handleCloseSnackBar} color='success' sx={{ width: '100%' }}>{successMessage}</MuiAlert>
       </Snackbar>


    </Container>
  );
};

export default Symptoms;
