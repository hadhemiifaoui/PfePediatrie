import React, { useEffect, useState, useCallback } from "react";
import {
  Grid, Typography, Paper, Table, TableBody,
  Checkbox, TableCell, TableContainer, TableHead, TableRow,
  Button, 
   CircularProgress
} from '@mui/material';
//import { Delete as DeleteIcon, Edit as EditIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import casesServices from "../../services/casesServices";
import CaseList from "../case/caseList";
//import AddSymptomForm from "./addSymptom";
//import MuiAlert from '@mui/material/Alert';
//import symptomsservices from '../../services/symptomsServices'
import Title from "../title/title";

const SymptomList = ({ caseId }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [error, setError] = useState('');
 // const [successMessage, setSuccessMessage] = useState('');
//  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showCaseList, setShowCaseList] = useState(false);
//  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSymptoms = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching symptoms for case ID:', caseId);
      const response = await casesServices.viewSymptoms(caseId);
      console.log('Received response:', response);
      setSymptoms(response); 
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      setError('Failed to fetch symptoms');
    }
    setLoading(false);
  }, [caseId]);

  useEffect(() => {
    console.log('Received case ID:', caseId);
    if (caseId) {
      fetchSymptoms();
    } else {
      console.warn('No case ID provided');
    }
  }, [caseId, fetchSymptoms]);

 
  const handleBackToCaseList = () => {
    setShowCaseList(true);
  };

 
  return (
    <> 
      <Grid style={{marginTop:"4%"}}></Grid>
      {showCaseList ? (
        <CaseList />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom>
                    <Title>Symptôme spécifique</Title>
                </Typography>
                <Button
              variant="contained"
              color="inherit"
              style={{ backgroundColor: 'gray', color: 'white', fontSize: '12px' , width:40 , height:25 }}
              onClick={handleBackToCaseList}
            >
              Retour
            </Button>
               
              </Grid>
              {loading ? (
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                  <CircularProgress />
                </Grid>
              ) : symptoms.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Fièvre</TableCell>
                        <TableCell>Hypothermie</TableCell>
                        <TableCell>Signes hémodynamiques</TableCell>
                        <TableCell>Signes respiratoires</TableCell>
                        <TableCell>Signes neurologiques</TableCell>
                        <TableCell>Signes cutanés</TableCell>
                        <TableCell>Signes digestifs</TableCell>
                        <TableCell>Gravité</TableCell>                      
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {symptoms.map((caseItem) => (
                        <TableRow  key={caseItem._id}>
                          <TableCell>
                            <Checkbox checked={caseItem.fever} disabled />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={caseItem.hypothermia} disabled />
                          </TableCell>
                          <TableCell>{caseItem.hemodynamicSigns.join(', ')}</TableCell>
                          <TableCell>{caseItem.respiratorySigns.join(', ')}</TableCell>
                          <TableCell>{caseItem.neurologicalSigns.join(', ')}</TableCell>
                          <TableCell>{caseItem.cutaneousSigns.join(', ')}</TableCell>
                          <TableCell>{caseItem.digestiveSigns.join(', ')}</TableCell>
                          <TableCell>{caseItem.gravity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1">
                    Aucun symptôme disponible pour ce cas clinique 
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SymptomList;



   /*
    <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MuiAlert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
              {error || successMessage}
            </MuiAlert>
          </Snackbar>
          <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
            <DialogTitle>Add New Symptom</DialogTitle>
            <DialogContent>
              <AddSymptomForm caseId={caseId} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>


    const handleDeleteSymptom = async (id) => {
    const isConfirmed = window.confirm('Are U Sure U wanna Remove This Symptom ??')
    if(!isConfirmed){
      return;
    }
    try {
      await symptomsservices.removeSymptom(id);
      setSymptoms((prevSymptoms) => prevSymptoms.filter(symptom => symptom._id !== id));
      setSuccessMessage('Symptom deleted successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting symptom:', error);
      setError('Failed to delete symptom');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setError('');  
  };



      

   const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  <IconButton color="primary" onClick={handleOpenAddDialog}>
                  <AddCircleIcon />
                </IconButton>


 const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

 


          */