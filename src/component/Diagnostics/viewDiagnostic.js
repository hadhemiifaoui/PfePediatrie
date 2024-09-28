import React, { useEffect, useState } from 'react';
import {
  Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Collapse, CardContent, Checkbox, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import casesServices from '../../services/casesServices';
import CaseList from '../case/caseList';
//import DiagnosticTreatementPlanDetailsDialog from '../Diagnostics/diagnosticsDetails';
import Title from '../title/title';

const DiagnosticsList = ({ caseId, onClose }) => {
  const [diagnostics, setDiagnostics] = useState([]);
  const [error, setError] = useState('');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [showCaseList, setShowCaseList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(null);
  const [openDiagnosticTreatementPlan, setOpenDiagnosticTreatementPlan] = useState(false);
  const [treatmentPlan, setTreatmentPlan] = useState('');

  useEffect(() => {
    if (caseId) {
      fetchDiagnostics();
    } else {
      console.warn('No case ID provided');
    }

    async function fetchDiagnostics() {
      setLoading(true);
      try {
        const diagnosticsData = await casesServices.viewDiagnostics(caseId);
        setDiagnostics(diagnosticsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching diagnostics:', error);
        setError('Failed to fetch diagnostics');
        setLoading(false);
      }
    }
  }, [caseId]);

  const handleClose = () => {
    setSelectedDiagnostic(null);
    setOpenDiagnosticTreatementPlan(false);
  };

  const handleClickOpen = (diagnostic, treatmentPlan) => {
    setSelectedDiagnostic(diagnostic);
    setTreatmentPlan(stripHtmlTags(treatmentPlan));
    setOpenDiagnosticTreatementPlan(true);
  };

  const handleCloseTreatementPlanDialog = () => {
    setOpenDiagnosticTreatementPlan(false);
  };

  const handleBackToCaseList = () => {
    setShowCaseList(true);
    onClose();
  };

  const toggleDiagnosticDetails = (caseItem) => {
    if (selectedDiagnosticId === caseItem._id) {
      setSelectedDiagnosticId(null);
    } else {
      setSelectedDiagnosticId(caseItem._id);
    }
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Grid style={{ marginTop: "4%" }}></Grid>
      {showCaseList ? (
        <CaseList />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom>
                  <Title>Diagnostique spécifique</Title>
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  style={{ backgroundColor: 'gray', color: 'white', fontSize: '12px', width: 40, height: 25 }}
                  onClick={handleBackToCaseList}
                >Retour</Button>
              </Grid>
              {loading ? (
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                  <CircularProgress />
                </Grid>
              ) : diagnostics.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Facteurs/Risques</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Date du diagnostic</TableCell>
                        <TableCell>Confirmé</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {diagnostics.map((caseItem) => (
                        <React.Fragment key={caseItem._id}>
                          <TableRow
                            onClick={() => toggleDiagnosticDetails(caseItem)}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell>{caseItem.factorsRisks}</TableCell>
                            <TableCell>{caseItem.name}</TableCell>
                            <TableCell>{new Date(caseItem.dateDiagnosed).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={caseItem.confirmed}
                                color="primary"
                              />
                            </TableCell>
                          </TableRow>
                          {selectedDiagnosticId === caseItem._id && (
                            <TableRow>
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={selectedDiagnosticId === caseItem._id} timeout="auto" unmountOnExit>
                                  <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                      Description: {caseItem.description}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                      Plan du Traitement: {truncateText(stripHtmlTags(caseItem.treatmentPlan), 100)}
                                      <Button onClick={() => handleClickOpen(caseItem, caseItem.treatmentPlan)}>
                                        <span role="img" aria-label="notes">📝</span>
                                      </Button>
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
              ) : (
                <Typography variant="body1">
                  Aucun diagnostique disponible pour ce cas clinique
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
      <Dialog open={openDiagnosticTreatementPlan} onClose={handleCloseTreatementPlanDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Plan du Traitement</Title></DialogTitle>
        <DialogContent>
          <Typography variant="body1">{treatmentPlan}</Typography>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleCloseTreatementPlanDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiagnosticsList;



  /*  
           <IconButton color="primary" onClick={handleOpenAddDialog}>
                  <AddCircleIcon />
                </IconButton>

    const handleUpdateDiagnostic = async (updatedData) => {
    try {
      await diagnosticservices.updateDiagnostic(selectedDiagnostic._id, updatedData);
      const updatedDiagnostics = diagnostics.map((diag) =>
        diag._id === selectedDiagnostic._id ? { ...diag, ...updatedData } : diag
      );
      setDiagnostics(updatedDiagnostics);
      setSuccessMessage('Diagnostic updated successfully');
      setOpenSnackbar(true);
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating diagnostic:', error);
      setError('Failed to update diagnostic');
    }
  };


  const handleEditDiagnostic = (diagnostic) => {
    setSelectedDiagnostic(diagnostic);
    setOpenEditDialog(true);
  };
  
  
    
  const handleConfirmDiagnostic = (diagnostic) => {
    setSelectedDiagnostic(diagnostic);
    setOpenTestsDialog(true); 
  };

  
                       <TableCell>
                              <IconButton color="primary" onClick={() => handleEditDiagnostic(caseItem)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton color="secondary" onClick={() => handleDeleteDiagnostic(caseItem._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>


 <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
 <DialogTitle>Add Diagnostic</DialogTitle>
 <DialogContent>
   <AddDiagnosticForm caseId={caseId} onSubmit={handleAddDiagnosticSubmit} onCancel={handleCloseAddDialog} />
 </DialogContent>
</Dialog>


<Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
 <DialogTitle>Edit Diagnostic</DialogTitle>
 <DialogContent>
   {selectedDiagnostic && (
     <EditDiagnosticForm
       diagnostic={selectedDiagnostic}
       onSubmit={handleUpdateDiagnostic}
       onCancel={handleCloseEditDialog}
     />
   )}
 </DialogContent>
</Dialog>
         


  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedDiagnostic(null);
  };


  const handleAddDiagnosticSubmit = async (diagnosticData) => {
    try {
      await casesServices.addDiagnostic(caseId, diagnosticData);
      const updatedDiagnostics = await casesServices.viewDiagnostics(caseId);
      setDiagnostics(updatedDiagnostics);
      setSuccessMessage('Diagnostic added successfully');
      setOpenSnackbar(true);
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding diagnostic:', error);
      setError(error.response ? error.response.data.error : error.message);
    }
  };


  
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };


const handleDeleteDiagnostic = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this diagnostic?');
    if (!isConfirmed) {
      return;
    }
    try {
      await diagnosticservices.deleteDiagnostic(id);
      setDiagnostics(diagnostics.filter((diagnostic) => diagnostic._id !== id));
      setSuccessMessage('Diagnostic deleted successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting diagnostic:', error);
      setError('Failed to delete diagnostic');
    }
  };

   const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

   <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert onClose={handleSnackbarClose} severity="success" elevation={6} variant="filled">
              {successMessage}
            </MuiAlert>
          </Snackbar>


          
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
*/
