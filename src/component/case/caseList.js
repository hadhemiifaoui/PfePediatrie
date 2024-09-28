import React, { useContext, useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
   Fab, Button, Collapse, CardContent,  InputAdornment  , IconButton , 
  TextField, MenuItem, Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import AddReviewForm from '../Review/addReview';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../authentification/AuthContext';
import DiagnosticsList from '../Diagnostics/viewDiagnostic';
import ListSymptoms from '../Symptoms/viewSymptom';
import CaseForm from './caseForm';
import EditCaseForm from './EditCase'; 
import CaseContext from '../../context/CaseContext';
import Title from '../title/title';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
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
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const toggleCaseForm = () => {
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

  const toggleEditCaseForm = () => {
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
    const matchesType = searchType ? caseItem.pediatricType === searchType : true;
    const matchesQuery = searchQuery ? caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesStatus = userRole === 'pediatre' ? caseItem.status === 'Ouverte' : true;
    return matchesType && matchesQuery && matchesStatus;
  });

  const handleCloseSnackBar = () =>{
      setOpenSnackBar(true) 
   }



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
    <Fab color="primary" aria-label="add"  onClick={toggleCaseForm} 
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
            
              {userRole === 'pediatre' && (
                <div style={{ position: 'relative' }}>
                <Link
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenReviewDialog(true)}
                  style={{ position: 'absolute', top: '50px' }} 
                >Ajouter votre avis</Link>
               </div>
               )}
               
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
   
      <Dialog open={showCaseForm} onClose={toggleCaseForm} maxWidth="md" fullWidth>
        <DialogTitle><Title>Créer un Cas Clinique</Title></DialogTitle>
        <DialogContent>
          <CaseForm onClose={toggleCaseForm} />
        </DialogContent>
      
          <DialogActions>
          <CloseIcon onClick={toggleCaseForm}  color="primary" />    
        </DialogActions>
      
      </Dialog>

      <Dialog open={showEditCaseForm} onClose={toggleEditCaseForm} maxWidth="md" fullWidth>
        <DialogTitle><Title>Modifier le Cas Clinique</Title></DialogTitle>
        <DialogContent>
          <EditCaseForm caseItem={selectedItem} onClose={toggleEditCaseForm} />
        </DialogContent>
        <DialogActions>
          <CloseIcon onClick={toggleEditCaseForm} color="primary" />    
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


      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Title>Ajouter votre avis</Title>
        </DialogTitle>
        <DialogContent>
          <AddReviewForm caseId={selectedCaseId} onClose={() => setOpenReviewDialog(false)}
           refresh={() => setRefresh(!refresh)} />
        </DialogContent>      
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


/*
import React, { useContext, useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
   Fab, Button, Collapse, CardContent,  InputAdornment  , IconButton , 
  TextField, MenuItem, Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../authentification/AuthContext';
import DiagnosticsList from '../Diagnostics/viewDiagnostic';
import ListSymptoms from '../Symptoms/viewSymptom';
import CaseForm from './caseForm';
import EditCaseForm from './EditCase'; 
import CaseContext from '../../context/CaseContext';
import Title from '../title/title';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
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
  const { cases = [], loadCases, deleteCase } = useContext(CaseContext);
  
  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const toggleCaseForm = () => {
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

  const toggleEditCaseForm = () => {
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

  const handleDiagnosticAdded = () => {
    setSuccessMessage('Diagnostique ajouté avec succé !');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
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
    const matchesType = searchType ? caseItem.pediatricType === searchType : true;
    const matchesQuery = searchQuery ? caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesType && matchesQuery;
  }

  );

  const handleCloseSnackBar = () =>{
      setOpenSnackBar(true) 
   }



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
    <Fab color="primary" aria-label="add"  onClick={toggleCaseForm} 
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
                      <TableCell>{new Date(caseItem.dateOpened).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {userRole === 'admin' && (<IconButton onClick={(e) => { e.stopPropagation(); handleUpdate(caseItem._id); }} color="success" aria-label="edit">
                           <PencilSquare />
                        </IconButton> )}
                        {userRole === 'admin' && (
                        <IconButton onClick={(e) => { e.stopPropagation(); handleOpenDeletDialog(caseItem); }} color="error" aria-label="delete">
                          <Trash />
                        </IconButton> )}
                        <IconButton
                         onClick={() => viewDiagnostics(caseItem._id)}
                          aria-label="view-diagnostics"
                        >
                          <Typography variant="caption">
                              voir diagnostiques
                          </Typography>
                        </IconButton>
                        <IconButton
                         onClick={(e) => { e.stopPropagation(); viewSymptoms(caseItem._id)}}
                          aria-label="view-symptoms"
                        >
                          <Typography variant="caption">
                             voir symptomes
                          </Typography>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={selectedCaseId === caseItem._id} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography variant="body2" component="p">
                              <strong>Descriptions</strong>
                              {caseItem.description}
                            </Typography>
                            <Typography variant="body2" component="p">
                              <strong>Notes</strong>
                              {caseItem.notes}
                            </Typography>
                          </CardContent>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {showDiagnosticsList && (
        <Grid item xs={12}>
          <DiagnosticsList
            caseId={selectedCaseId}
            onClose={() => {
              setShowDiagnosticsList(false);
              setShowCaseList(true);
            }}
           onDiagnosticAdded={handleDiagnosticAdded}
          />
        </Grid>
      )}
      {showSymptomsList && (
        <Grid item xs={12}>
          <ListSymptoms
            caseId={selectedCaseId}
            onClose={() => {
              setShowSymptomsList(false);
              setShowCaseList(true);
            }}
          />
        </Grid>
      )}


      <Dialog open={showCaseForm} onClose={toggleCaseForm} fullWidth maxWidth="md">
        <DialogTitle><Title>Ajouter une Nouvelle cas clinique</Title></DialogTitle>
        <DialogContent>
          <CaseForm onSuccess={toggleCaseForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCaseForm}>Annuler</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showEditCaseForm} onClose={toggleEditCaseForm} fullWidth maxWidth="md">
        <DialogTitle><Title>Modifier le cas clinique</Title></DialogTitle>
        <DialogContent>
          {selectedItem && (
            <EditCaseForm
            caseItem={selectedItem}
            onClose={toggleEditCaseForm}
            />
          )}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={toggleEditCaseForm}>
             <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
   
     
      <Dialog open={openDeleteDialog} onClose={handleCloseDeletDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer ce cas clinique ?</em>
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

      <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleCloseSnackBar}  
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
   
    </Grid>
  );
};

export default CaseList;
*/