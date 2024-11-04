import React, { useContext, useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
   Fab, Button, Collapse, CardContent,  InputAdornment  , IconButton , 
  TextField, MenuItem, Snackbar
} from '@mui/material';

import jsPDF from 'jspdf';


import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../authentification/AuthContext';
import DiagnosticsList from '../Diagnostics/viewDiagnostic';
import ListSymptoms from '../Symptoms/viewSymptom';
import CaseForm from './caseForm';
import EditCaseForm from './EditCase'; 
import CaseContext from '../../context/CaseContext';
import Title from '../title/title';
import { PencilSquare, Trash ,Download} from 'react-bootstrap-icons';
import SearchIcon from '@mui/icons-material/Search';

const pediatricTypes = [
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
      'Réanimation pédiatrique'
];

const CaseList = () => {
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCaseList, setShowCaseList] = useState(true);
  const [showDiagnosticsList, setShowDiagnosticsList] = useState(false);
  const [showSymptomsList, setShowSymptomsList] = useState(false);
  const [showEditCaseForm, setShowEditCaseForm] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar , setOpenSnackBar] = useState(null)
  const [caseToDelete , setCaseToDelete] = useState(null);
  const [openDeleteDialog , setOpenDeleteDialog] = useState(false)
  const  {userRole} = useAuth();
  const [refresh , setRefresh] = useState(false);
  const { cases = [], loadCases, deleteCase } = useContext(CaseContext);
 

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const handleCloseAdd = () => {
    setShowCaseForm(!showCaseForm);
  };

 
  const handleOpenDeletDialog=(caseClinique)=>{
    setCaseToDelete(caseClinique)
    setOpenDeleteDialog(true)
}

const handleCloseDeletDialog=()=>{
 setCaseToDelete(null)
 setOpenDeleteDialog(false)
}


   

  const handleDelete = async () => {
    if(!caseToDelete){
      return;
    }
    try {
      await deleteCase(caseToDelete._id);
      console.log('hhhh')
      setSuccessMessage("Cas Clinique supprimé avec succée")
      setOpenSnackBar(true)
      setTimeout(() => {
        setOpenSnackBar(false);
        setSuccessMessage('');
      }, 3000);
      handleCloseDeletDialog()
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  const handleUpdate = (id) => {
    const caseItem = cases.find((c) => c._id === id);
    if (caseItem) {
      setSelectedItem(caseItem);
      setShowEditCaseForm(true); 
    }
  };

  const handleClose = () => {
    setShowEditCaseForm(!showEditCaseForm);
  };

  const toggleCaseDetails = (caseItem) => {
    if (selectedCaseId === caseItem._id) {
      setSelectedCaseId(null);
      setShowSymptomsList(false);
      setSelectedItem(null);
    } else {
      setSelectedCaseId(caseItem._id);
      setShowSymptomsList(false);
      setSelectedItem(null);
    }
  };

  const viewDiagnostics = async (caseId) => {
    try {
      console.log('handleViewDiagnostics - caseId:', caseId); 
      setShowCaseList(false);
      setShowDiagnosticsList(true);
      console.log('show Diagnostics for case with id :', caseId);
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
    }
  };

  const viewSymptoms = async (caseId) => {
    try {
      setShowCaseList(false);
      setShowSymptomsList(true);
      console.log('show symptoms for case with id :', caseId);

    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };
   
   const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    
  };

  const filteredCases = cases.filter((caseItem) => { 
    const memeType = searchType ? caseItem.pediatricType === searchType : true;
    const memeQuery = searchQuery ? caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const memeStatus = userRole === 'pediatre' ? caseItem.status === 'Ouverte' : true;
    return memeType && memeQuery && memeStatus;
  });

  const handleCloseSnackBar = () =>{
      setOpenSnackBar(true) 
   }
  
   
  //télécharger le cas clinique en pdf 
   const downloadCaseData = (caseItem) => {
    const docum = new jsPDF();
    const pageWidth = docum.internal.pageSize.width;  
    docum.setFontSize(16);
    docum.text('Détails du Cas Clinique', 20, 20);
    docum.setFontSize(12);
    docum.text(`Titre: ${caseItem.title}`, 20, 40);
    docum.text(`Statut: ${caseItem.status}`, 20, 50);
    docum.text(`Type Pédiatrique: ${caseItem.pediatricType}`, 20, 60);
    docum.text(`Sévérité: ${caseItem.severity}`, 20, 70);
    docum.text(`Créer le: ${caseItem.dateOpened}`, 20, 80);
    const descriptionLines = docum.splitTextToSize(`Description: ${caseItem.description}`, pageWidth - 40);
    docum.text(descriptionLines, 20, 90);  
    const notesLines = docum.splitTextToSize(`Notes: ${caseItem.notes}`, pageWidth - 40);
    docum.text(notesLines, 20, 110 + descriptionLines.length * 10);
    docum.save(`${caseItem.title}_data.pdf`);
  
  };


  return (
    <Grid container spacing={2}>
      {showCaseList && (
        <Grid item xs={12}>
          <Typography variant="h5" style={{marginTop : '2%'}}>
            <Title>Liste des Cas Cliniques Pédiatrique</Title>
          </Typography>
        </Grid>
      )}
      {showCaseList && (
        <Grid item xs={12}>
          <TextField
            select
            variant='standard'
            label="Type Pédiatrique"
            value={searchType}
            onChange={handleSearchTypeChange}
            sx={{ marginLeft: '15px', minWidth: '200px' }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {pediatricTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField label="Chercher une cas cliniques" variant="standard"
                     value={searchQuery} style={{ width: "55%" }}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     sx={{ marginLeft: '20px', minWidth: '200px', marginBottom: '16px' }}
                  InputProps={{
                    endAdornment: (
                       <InputAdornment position="end">
                            <SearchIcon />
                       </InputAdornment>
                 ),
                 }}
               />        
   {userRole === 'admin' && ( 
    <Fab color="primary" aria-label="add"  onClick={handleCloseAdd} 
      sx={{bgcolor: '#B3E5FC','&:hover': { bgcolor: '#81D4FA' },
      width: 30,height: 30,minHeight: 'unset'}} style={{marginLeft:'5%'}}>
      <AddIcon fontSize="small" />
   </Fab>)} 

 </Grid>
      )}
      {showCaseList && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
                  <TableCell sx={{ color: '#000000' }}>Titre</TableCell>
                  <TableCell sx={{ color: '#000000' }}>Statut</TableCell>
                  <TableCell sx={{ color: '#000000' }}>Type Pédiatrique</TableCell>
                  <TableCell sx={{ color: '#000000' }}>sévérité</TableCell>
                  <TableCell sx={{ color: '#000000' }}>Créer le</TableCell>
                   <TableCell sx={{ color: '#000000' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <React.Fragment key={caseItem._id}>
                    <TableRow
                      onClick={() => toggleCaseDetails(caseItem)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{caseItem.title}</TableCell>
                      <TableCell>{caseItem.status}</TableCell>
                      <TableCell>{caseItem.pediatricType}</TableCell>
                      <TableCell>{caseItem.severity}</TableCell>
                      <TableCell>{caseItem.dateOpened}</TableCell>
                       <TableCell>
                      <Button size="small" onClick={() => viewDiagnostics(caseItem._id)}>
                           <small><em>voir diagnostique</em></small>
                       </Button>
                       <Button size="small"  onClick={(e) =>  { e.stopPropagation(); viewSymptoms(caseItem._id)}}
                          aria-label="view-symptoms">
                          <small><em>voir symptôme</em></small>
                       </Button>
                          {userRole === 'admin' && ( 
                         <IconButton
                           aria-label="delete" color='error'
                           onClick={(e) => { e.stopPropagation(); handleOpenDeletDialog(caseItem) }}
                          >
                           <Trash />
                          </IconButton>)}
                          {userRole === 'admin' && ( 
                        <IconButton 
                          aria-label="edit" color='success'
                          onClick={(e) => { e.stopPropagation(); handleUpdate(caseItem._id); }}
                          >
                           <PencilSquare />
                        </IconButton>
                        
                           )}
                           <IconButton
                          aria-label="download" color='primary'
                          onClick={(e) => { e.stopPropagation(); downloadCaseData(caseItem); }}
                        >
                          <Download />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {selectedCaseId === caseItem._id && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Collapse in={selectedCaseId === caseItem._id}>
                            <CardContent>
                              <Typography variant="h6"><small><em><strong>Détails du Cas Clinique</strong></em></small></Typography>
                              
                              <Typography>
                                <strong>Description:</strong> {caseItem.description}
                              </Typography>
                              <Typography>
                                <strong>Notes:</strong> {caseItem.notes}
                              </Typography>
                        
                            </CardContent>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
           
        </Grid>
      )}
      
      {showDiagnosticsList && (
        <Grid item xs={12}>
          <DiagnosticsList caseId={selectedCaseId}  
          onClose={() => {
              setShowDiagnosticsList(false);
              setShowCaseList(true);
            }}/>
        </Grid>
      )}
      {showSymptomsList && (
        <Grid item xs={12}>
          <ListSymptoms caseId={selectedCaseId}    
            onClose={() => {
              setShowSymptomsList(false);
              setShowCaseList(true);
            }}/>
        </Grid>
      )}
   
      <Dialog open={showCaseForm} onClose={handleCloseAdd} maxWidth="md" fullWidth>
        <DialogTitle><Title>Créer un Cas Clinique</Title></DialogTitle>
        <DialogContent>
          <CaseForm onClose={handleCloseAdd} refresh={() => setRefresh(!refresh)} />
        </DialogContent>
      
          <DialogActions>
        
        </DialogActions>
      
      </Dialog>

      <Dialog open={showEditCaseForm} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle><Title>Modifier le Cas Clinique</Title></DialogTitle>
        <DialogContent>
          <EditCaseForm caseItem={selectedItem} onClose={handleClose} refresh={() => setRefresh(!refresh)}/>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeletDialog}>
        <DialogTitle>Confirmer la Suppression</DialogTitle>
        <DialogContent>
          <Typography>
              Êtes-vous sûr de vouloir supprimer ce cas clinique?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackBar} 
         anchorOrigin={{vertical:'top' , horizontal:'right'}}>
        <MuiAlert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>

  );
};

export default CaseList;

