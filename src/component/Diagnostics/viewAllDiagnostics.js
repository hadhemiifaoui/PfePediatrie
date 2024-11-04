import React, { useState, useEffect } from 'react';
import casesServices from '../../services/casesServices';
import diagnosticservices from '../../services/diagnoticServices';
//import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Title from '../title/title';
import {Container, FormControl,Grid, Typography ,Box, InputLabel, Select, MenuItem, 
  Table, IconButton,TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button ,Dialog,DialogContent,
   DialogTitle, DialogActions , Snackbar} from '@mui/material';
//import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import DiagnosticTreatementPlanDetailsDialog from './diagnosticsDetails';
import DiagnosticDescriptionDetails from './diagnosticDescriptionDetails';
import DiagnosticDetailsFactorRisks from './diagnosticDetailsFactorRisk'
import EditDiagnosticForm from './editDiagnosticForm';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../authentification/AuthContext'; 
import AddDiagnosticForm from './addDiagnostic'

const pediatricTypes = [
  'All', 'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique',
  'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique', 'Pathologies infectieuses pédiatriques',
  'Hépato-gastro-entérologie', 'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique',
  'Hématologie pédiatrique', 'Chirurgie pédiatrique', 'Urgences chirurgicales',
  'Intoxication chez l’enfant', 'Réanimation pédiatrique'
];

const Diagnostics = () => {
  const [diagnostics, setDiagnostics] = useState([]);
  const [pediatricType, setPediatricType] = useState('');
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [dialogType, setDialogType] = useState('');
  //const [open, setOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [diagnosticToDelete , setDiagnosticToDelte] = useState(null);
  const [openDeleteDialog , setOpenDeleteDialog] = useState(false)
  const [openSnackbar , setOpenSnackbar] = useState(null)
  const [successMessage , setSuccessMessage] = useState('')
  const {userRole} = useAuth();
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
          const response = await casesServices.viewDiagnostics(selectedCaseId);
          if( userRole === "pediatre") {
            setDiagnostics(response.filter(diagnostic => diagnostic.status === "confirmé"))
          }
          else{
            setDiagnostics(response);
          }
          
        } catch (err) {
          console.error(err);
          setDiagnostics([]);
        }
      }
    };
    fetchDiagnostics();
  }, [selectedCaseId]);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (selectedCaseId) {
        try {
          const response = await casesServices.viewDiagnostics(selectedCaseId);
          setDiagnostics(response);
        } catch (err) {
          console.error(err);
          setDiagnostics([]);
        }
      }
    };
    fetchDiagnostics();
  }, [refresh]);
  
    const handleCloseSnackBar = async () =>{
      setOpenSnackbar(false)
  }
    const handleOpenDeleteDialog = async (diagnostic) =>{
         setDiagnosticToDelte(diagnostic)
         setOpenDeleteDialog(true)
    }

   const handleCloseDeleteDialog = async () =>{
       setDiagnosticToDelte(null);
       setOpenDeleteDialog(false);
   }

   const handleDelete = async() =>{
      if(!diagnosticToDelete) return;
      try{
          await diagnosticservices.deleteDiagnostic(diagnosticToDelete._id);
          setDiagnostics(diagnostics.filter((diagnostic) => diagnostic._id !== diagnosticToDelete._id));
          setSuccessMessage('Diagnostique Supprimé Avec Succé !!');
          setOpenSnackbar(true);
          handleCloseDeleteDialog();
      } 
      catch(error){
        console.error('Error suppr Diag' , error);
      }
   }

  const handleClickOpen = (diagnostic, type) => {
    setSelectedDiagnostic(diagnostic);
    setDialogType(type);
  };

  const handleClose = () => {
    setSelectedDiagnostic(null);
    setDialogType('');
  };

  const handleUpdate = async (updatedDiagnostic) => {
    try {
      const response = await diagnosticservices.updateDiagnostic(updatedDiagnostic._id, updatedDiagnostic);
      setDiagnostics((prevDiagnostics) =>
        prevDiagnostics.map((diag) =>
          diag._id === response._id ? response : diag
        )
      );
    } catch (err) {
      console.error('Error updating diagnostic:', err);
    }
  };

  const handleSave = (updatedTreatmentPlan) => {
    setDiagnostics((prevDiagnostics) =>
      prevDiagnostics.map((diag) =>
        diag._id === selectedDiagnostic._id ? { ...diag, treatmentPlan: updatedTreatmentPlan } : diag
      )
    );
  };

  const truncateHtml = (html, maxLength) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };


   
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  

  
  


  return (
    <Container >
     
      <Grid item xs={12} >
          <Typography variant="h5" style={{ marginTop: '3%' }}>
            <Title>Liste des diagnostiques </Title>
          </Typography>
      </Grid>

      <Box display="flex" alignItems="center" marginBottom="30px"  style={{ marginTop: '5%' }}>
      
    
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
            <InputLabel>Informations sur le cas clinique</InputLabel>
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
         {(userRole === 'admin' || userRole === 'pediatre') && ( 
          <div style={{ marginLeft: '15%' }}>
            <IconButton onClick={handleOpenAddDialog}>
              <AddCircleOutlineIcon style={{ color: '#89CFF0', fontSize: '25px' }} />
            </IconButton>
          </div>
        )}
         
          
      </Box>
      <TableContainer component={Paper}>
         <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </MuiAlert>
        </Snackbar>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
              <TableCell><strong>Facteurs risques</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
             
              <TableCell><strong>Plan du diagnostic</strong></TableCell>

              <TableCell><strong>Gravité</strong></TableCell>
              <TableCell><strong>Crée le </strong></TableCell>
              <TableCell><strong>Mettre à jour le</strong></TableCell>
              <TableCell><strong>Ajouté par</strong></TableCell>
              <TableCell><strong>Statut</strong></TableCell>
               {userRole ==='admin' && ( <TableCell colSpan={2}>
                <strong>Actions</strong>
              </TableCell>)}  
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnostics.length > 0 ? (
              diagnostics.map((diagnostic) => (
                <TableRow key={diagnostic._id}>
                <TableCell>
                    {diagnostic.factorsRisks.length > 50
                      ? diagnostic.factorsRisks.substring(0, 50) + '...'
                      : diagnostic.factorsRisks}
                    <Button onClick={() => handleClickOpen(diagnostic, 'factorsRisks')}>
                      <span role="img" aria-label="notes">📝</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {diagnostic.description.length > 50
                      ? diagnostic.description.substring(0, 50) + '...'
                      : diagnostic.description}
                    <Button onClick={() => handleClickOpen(diagnostic, 'description')}>
                      <span role="img" aria-label="notes">📝</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {truncateHtml(diagnostic.treatmentPlan, 100)}
                  <Button onClick={() => handleClickOpen(diagnostic, 'treatmentPlan')}>
                    <span role="img" aria-label="notes">📝</span>
                   </Button>
                  </TableCell>
                  <TableCell>{diagnostic.severity}</TableCell>
                
                  <TableCell>{new Date(diagnostic.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(diagnostic.updatedAt).toLocaleString()}</TableCell>
                  <TableCell> Dr {diagnostic.createdBy ? diagnostic.createdBy.firstname : 'Inconnue'}</TableCell> 
                  <TableCell>{diagnostic.status}</TableCell>
                {userRole === 'admin' && (
                    <TableCell style={{ padding: '0 4px' }}>
                    <IconButton onClick={() => handleClickOpen(diagnostic, 'edit')} color="success">
                      <PencilSquare />
                    </IconButton>
                  </TableCell>
                )}   
                {userRole === 'admin' && (
                      <TableCell style={{ padding: '0 4px' }}>
                      <IconButton color="error" onClick={() => handleOpenDeleteDialog(diagnostic)}>
                        <Trash />
                      </IconButton>
                    </TableCell>
                )}  
                 
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Accun diagnostique disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Ajouter une diagnostique</Title></DialogTitle>
        <DialogContent>
          <AddDiagnosticForm caseId={selectedCaseId} handleClose={handleCloseAddDialog}   refresh={() => setRefresh(!refresh)} />
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>

      {selectedDiagnostic && dialogType === 'treatmentPlan' && (
        <DiagnosticTreatementPlanDetailsDialog
          open={Boolean(selectedDiagnostic)}
          onClose={handleClose}
          diagnostic={selectedDiagnostic}
          onSave={handleSave}  
        />
      )}
      {selectedDiagnostic && dialogType === 'description' && (
        <DiagnosticDescriptionDetails
          open={Boolean(selectedDiagnostic)}
          onClose={handleClose}
          diagnostic={selectedDiagnostic}
        />
      )}
        {selectedDiagnostic && dialogType === 'factorsRisks' && (
        <DiagnosticDetailsFactorRisks
          open={Boolean(selectedDiagnostic)}
          onClose={handleClose}
          diagnostic={selectedDiagnostic}
        />
      )}
      {selectedDiagnostic && dialogType === 'edit' && (
        <EditDiagnosticForm
          open={Boolean(selectedDiagnostic)}
          onClose={handleClose}
          diagnostic={selectedDiagnostic}
          onUpdate={handleUpdate}    refresh={() => setRefresh(!refresh)} 
        />
      )}

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer ce diagnostique ?</em>
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
    </Container>
  );
};

export default Diagnostics;

/*<TableCell><strong>Plan du Traitement détaillé</strong></TableCell>*/

/*<TableCell>
{truncateHtml(diagnostic.treatmentPlan, 100)}
<Button onClick={() => handleClickOpen(diagnostic, 'treatmentPlan')}>
  <span role="img" aria-label="notes">📝</span>
</Button>
</TableCell>*/