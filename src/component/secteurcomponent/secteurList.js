import React, { useState, useEffect } from 'react';
import {
   Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Collapse,
  IconButton, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select,
  MenuItem, InputAdornment,Card , Snackbar, Alert,Grid, 
  Typography
} from '@mui/material';

import { KeyboardArrowDown, KeyboardArrowUp, Search , Add } from '@mui/icons-material';

import secteurServices from '../../services/secteurServices';
import Title from '../title/title';
import EditFormModal from './secteurForm';
import { PencilSquare , Trash } from 'react-bootstrap-icons';
import { styled } from '@mui/system';


const CustomButton = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  width: 85,
  height: 35,
  
});

const SecteurList = () => {
  const [secteurs, setSecteurs] = useState([]);
  const [open, setOpen] = useState({});
  const [nom, setNom] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");
  const [selectedSecteurId, setSelectedSecteurId] = useState(null);
  const [searchQueries, setSearchQueries] = useState({});
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [editingSituationId, setEditingSituationId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const [openDeleteSecteurDialog, setOpenDeleteSecteurDialog] = useState(false);
  const [secteurToDelete, setSecteurToDelete] = useState(null);

  
  const [openDeleteCaseDialog, setOpenDeleteCaseDialog] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const data = await secteurServices.getSecteurs();
        setSecteurs(data);
      } catch (error) {
        console.error('Error fetching secteurs:', error);
        setNotification({ open: true, message: 'Error fetching secteurs', severity: 'error' });
      }
    };

    fetchSecteurs();
  }, []);
  
  const handleCreateSecteur = async (e) => {
    e.preventDefault();
    try {
        const secteur = await secteurServices.create({ nom });
        setSecteurs([...secteurs, secteur]);
        setNom('');
        setNotification({ open: true, message: 'Spécialité crée avec succé', severity: 'success' });
    } catch (error) {
        console.error('Error creating secteur:', error);
        setNotification({ open: true, message: 'Error creating secteur', severity: 'error' });
    }
};

const handleOpenDeleteSecteurDialog = (secteur) => {
  setSecteurToDelete(secteur);
  setOpenDeleteSecteurDialog(true);
};

const handleCloseDeleteSecteurDialog = () => {
  setSecteurToDelete(null);
  setOpenDeleteSecteurDialog(false);
};

  const handleDeleteSecteur = async () => {
    if (!secteurToDelete) return;
    try {
      await secteurServices.deleteSecteur(secteurToDelete._id);
      setSecteurs(secteurs.filter((secteur) => secteur._id !== secteurToDelete._id));
      setNotification({ open: true, message: 'Spécialité supprimé avec succé', severity: 'success' });
    } catch (error) {
      console.error('Error deleting secteur:', error);
      setNotification({ open: true, message: 'la supprission de scpécialité echoué', severity: 'error' });
    }
  };

  
const handleOpenDeleteCaseDialog = (casetodelete) => {
  setCaseToDelete(casetodelete);
  setOpenDeleteCaseDialog(true);
};

const handleCloseDeleteCaseDialog = () => {
  setCaseToDelete(null);
  setOpenDeleteCaseDialog(false);
};


  const handleDeleteCaseFromSector = async (secteurId, caseId) => {
     const isConfirmed = window.confirm('Vous-Etes Sure de vouloir supprimer ce cas clinique !');
     if(!isConfirmed){
      return;
     } 
    try {
      await secteurServices.deleteCaseFromSector(secteurId, caseId);
      setSecteurs(prevSecteurs =>
        prevSecteurs.map(secteur =>
          secteur._id === secteurId 
            ? { ...secteur, cases: secteur.cases.filter(c => c._id !== caseId) } 
            : secteur
        )
      );
      setNotification({ open: true, message: 'Cas Clinique Supprimé avec succès', severity: 'success' });
    } catch (error) {
      console.error('Error deleting case:', error);
      setNotification({ open: true, message: 'Error deleting case', severity: 'error' });
    }
  };
  

  const handleAddCase = async (e) => {
    e.preventDefault();
    if (!newCaseTitle || !newCaseDescription) {
      setNotification({ open: true, message: 'Please fill in all fields', severity: 'warning' });
      return;
    }
    try {
      await secteurServices.addCaseToSecteur(selectedSecteurId, newCaseTitle, newCaseDescription);
      const updatedSecteurs = await secteurServices.getSecteurs();
      setSecteurs(updatedSecteurs);
      setOpenDialog(false);
      setNewCaseTitle("");
      setNewCaseDescription("");
      setSelectedSecteurId(null);
      setNotification({ open: true, message: 'Cas Clinique Ajouté avec succé', severity: 'success' });
    } catch (error) {
      console.error('Error adding case:', error);
      setNotification({ open: true, message: 'Error adding case', severity: 'error' });
    }
  };

  const toggleRow = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id]
    }));
  };

  const handleSearch = (id, e) => {
    setSearchQueries((prevQueries) => ({
      ...prevQueries,
      [id]: e.target.value
    }));
  };

  const getFilteredCases = (cases, query) => {
    return cases.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSave = () => {
    setIsModalOpen(false); 
    setEditingSituationId(null);
    setSelectedCaseId(null);
  };

  const handleEditCase = (secteurId, caseId) => {
    setEditingSituationId(secteurId); 
    setSelectedCaseId(caseId);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setEditingSituationId(null); 
    setSelectedCaseId(null);
  };

  return (
    <React.Fragment>
       <Grid style={{marginTop:'3%'}}>
      <Title >Liste des spécialités pédiatriques</Title>
      </Grid>
      <Grid style={{marginTop:'2%'}}></Grid>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Spécialité</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secteurs.map((secteur) => (
              <React.Fragment key={secteur._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(secteur._id)}
                    >
                      {open[secteur._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell><Box marginRight={2}>{secteur.nom}</Box></TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenDeleteSecteurDialog(secteur)}>
                        <Trash color="#cc141f" size={18} /> 
                    </Button>
                     <Button
                        onClick={() => { setSelectedSecteurId(secteur._id); setOpenDialog(true); }}
                        style={{
                              backgroundColor: '#d0dbda',
                              borderRadius: '50%',
                              minWidth: '8px',
                              minHeight: '8px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                             }}
                       >
                        <Add color="#fff" size={20} />
                    </Button>
                       </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open[secteur._id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="cases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Titre</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {getFilteredCases(secteur.cases, searchQueries[secteur._id] || "").map((cas) => (
                              <TableRow key={cas._id}>
                                <TableCell>{cas.title}</TableCell>
                                <TableCell>{cas.description}</TableCell>
                                <TableCell>
                                  <Button onClick={() => handleDeleteCaseFromSector(secteur._id, cas._id)}>
                                    <Trash color="#cc141f" size={18} /> 
                                  </Button>
                                  <Button onClick={() => handleEditCase(secteur._id, cas._id)}>
                                    <PencilSquare color="#538c37" size={18} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <TextField
                          label="Search Cases"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={searchQueries[secteur._id] || ""}
                          onChange={(e) => handleSearch(secteur._id, e)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle><Title>Ajouter nouvelle cas clinique</Title></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre de cas clinique"
            style={{width:"80%"}}
            variant='standard'
            value={newCaseTitle}
            onChange={(e) => setNewCaseTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            variant='standard'
            style={{width:"80%"}}
            multiline
            rows={4}
            value={newCaseDescription}
            onChange={(e) => setNewCaseDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions style={{marginLeft:'60%'}}>
          <CustomButton onClick={() => setOpenDialog(false)} >
            Annuler 
          </CustomButton>
          <CustomButton onClick={handleAddCase} >
            Ajouter
          </CustomButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000} anchorOrigin={{vertical:'top' , horizontal:'right'}}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>

      {editingSituationId && selectedCaseId && (
        <EditFormModal
          open={isModalOpen}
          onClose={handleCloseModal}
          secteurId={editingSituationId}
          caseId={selectedCaseId}
          onSave={handleSave}
        />
      )}
     <Grid style={{marginTop:'2%'}}></Grid>
     <Card style={{ width: "100%", height: 100, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
     <Grid></Grid>
      <form onSubmit={handleCreateSecteur} className="container" style={{ marginLeft: '10px' }}>
        <div class="row">
         <div class="col-2" style={{marginLeft:'0%'}}>
          <Typography color='black'><strong>Spécialité :</strong></Typography> </div>
          <div class="col-6">
          <Select
               style={{ width: "100%" }}
               value={nom}
               variant='standard'
               sx={{ marginLeft: '1px', minWidth: '200px', marginBottom: '16px' }}
              onChange={(e) => setNom(e.target.value)}
            required
          >
            <MenuItem value="Neonatologie">Neonatologie</MenuItem>
            <MenuItem value="Pneumologie pédiatrique">Pneumologie pédiatrique</MenuItem>
            <MenuItem value="Cardiologie pédiatrique">Cardiologie pédiatrique</MenuItem>
            <MenuItem value="Oto-rhino-laryngologie pédiatrique">Oto-rhino-laryngologie pédiatrique</MenuItem>
            <MenuItem value="Neurologie pédiatrique">Neurologie pédiatrique</MenuItem>
            <MenuItem value="Pathologies infectieuses pédiatriques">Pathologies infectieuses pédiatriques</MenuItem>
            <MenuItem value="Hépato-gastro-entérologie">Hépato-gastro-entérologie</MenuItem>
            <MenuItem value="Endocrinologie">Endocrinologie</MenuItem>
            <MenuItem value="Nephrologie">Nephrologie</MenuItem>
            <MenuItem value="Dermatologie pédiatrique">Dermatologie pédiatrique</MenuItem>
            <MenuItem value="Hématologie pédiatrique">Hématologie pédiatrique</MenuItem>
            <MenuItem value="Chirurgie pédiatrique">Chirurgie pédiatrique</MenuItem>
            <MenuItem value="Urgences chirurgicales">Urgences chirurgicales</MenuItem>
            <MenuItem value="Intoxication chez l’enfant">Intoxication chez l’enfant</MenuItem>
            <MenuItem value="Réanimation pédiatrique">Réanimation pédiatrique</MenuItem>
          </Select>
          </div>
          <div className="col-2">
          <CustomButton type="submit" variant="contained" style={{ marginLeft: '20%' }} >
             Ajouter 
          </CustomButton> </div>
         </div> 
       </form>
       </Card>
   
       <Dialog open={openDeleteSecteurDialog} onClose={handleCloseDeleteSecteurDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer cette Spécialité ?</em>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteSecteurDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteSecteur} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteCaseDialog} onClose={handleCloseDeleteCaseDialog}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer ce cas clinique?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteCaseDialog}>Annuler</Button>
          <Button 
             onClick={() => handleDeleteCaseFromSector(selectedSecteurId, caseToDelete._id)}
             color="secondary">Supprimer</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
};

export default SecteurList;
