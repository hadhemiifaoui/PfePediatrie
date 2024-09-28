import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import AddReviewForm from '../Review/addReview';

import {
  Container, FormControl, Box, InputLabel, Select, MenuItem,
  Table, IconButton, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogContent, DialogTitle, DialogActions,
  CircularProgress , Snackbar , Button
} from '@mui/material';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Title from '../title/title'
import casesServices from '../../services/casesServices';
import testServices from '../../services/testServices';
import AddTest from './addTest';
import EditRadiologicTest from './editRadiologicTest';
import EditBacteriologicTest from './editBacteriologicTest';
import EditBiologicTest from './editBiologicTest';

import MuiAlert from '@mui/material/Alert';

import { useAuth } from '../authentification/AuthContext'; 

const pediatricTypes = [
  'All', 'Neonatologie', 'Pneumologie pédiatrique', 'Cardiologie pédiatrique',
  'Oto-rhino-laryngologie pédiatrique', 'Neurologie pédiatrique', 'Pathologies infectieuses pédiatriques',
  'Hépato-gastro-entérologie', 'Endocrinologie', 'Nephrologie', 'Dermatologie pédiatrique',
  'Hématologie pédiatrique', 'Chirurgie pédiatrique', 'Urgences chirurgicales',
  'Intoxication chez l’enfant', 'Réanimation pédiatrique'
];

const Tests = () => {
  
  const [testRadiologiques, setTestRadiologiques] = useState([]);
  const [testBacteriologiques, setTestBacteriologiques] = useState([]);
  const [testBiologiques, setTestBiologiques] = useState([]);
  const [pediatricType, setPediatricType] = useState('');
  const [cases, setCases] = useState([]);
  const [testToDelete , setTestToDelete] = useState(null);
  const [openDeleteDialog , setOpenDeleteDialog] = useState(false);
  const [openSnackbar , setOpenSnackbar] =useState(false);
  const [successMessage , setSuccessMessage] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userRole } = useAuth();
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [refresh , setRefresh] = useState(false)


  useEffect(() => {
    const fetchCases = async () => {
      if (pediatricType) {
        setLoading(true);
        try {
          const response = await casesServices.getCasesByPediatricType(pediatricType);
          setCases(response);
        } catch (err) {
          console.error(err);
          setCases([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCases();
  }, [pediatricType]);

  useEffect(() => {
    const fetchTests = async () => {
      if (selectedCaseId) {
        setLoading(true);
        try {
          const response = await casesServices.getTests(selectedCaseId);
          setTestRadiologiques(response.filter(test => test.type === 'Test Radiologiques'));
          setTestBacteriologiques(response.filter(test => test.type === 'Test Bactériologiques'));
          setTestBiologiques(response.filter(test => test.type === 'Test Biologiques'));
        } catch (err) {
          console.error(err);
          setTestRadiologiques([]);
          setTestBacteriologiques([]);
          setTestBiologiques([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTests();
  }, [selectedCaseId]);

  const handleOpenEditDialog = (test) => {
    setSelectedTest(test);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedTest(null);
    setOpenEditDialog(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  

  const handleOpenDeleteDialog = async (test) =>{
    setTestToDelete(test)
    setOpenDeleteDialog(true)
}

const handleCloseDeleteDialog = async () =>{
  setTestToDelete(null);
  setOpenDeleteDialog(false);
}

const handleCloseSnackBar = () =>{
  setOpenSnackbar(false)
}

const handleDelete = async () => {
    if(!testToDelete) return;
    try {
      await testServices.deleteTest(testToDelete._id);
      setTestRadiologiques(testRadiologiques.filter((test) => test._id !== testToDelete._id));
      setTestBacteriologiques(testBacteriologiques.filter((test) => test._id !== testToDelete._id));
      setTestBiologiques(testBiologiques.filter(test => test._id !== testToDelete._id));
      setSuccessMessage('Test supprimé avec succès !!');
      setOpenSnackbar(true);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTestState = (updatedTest) => {
    switch (updatedTest.type) {
      case 'Test Radiologiques':
        setTestRadiologiques(prevTests => prevTests.map(test => test._id === updatedTest._id ? updatedTest : test));
        break;
      case 'Test Bactériologiques':
        setTestBacteriologiques(prevTests => prevTests.map(test => test._id === updatedTest._id ? updatedTest : test));
        break;
      case 'Test Biologiques':
        setTestBiologiques(prevTests => prevTests.map(test => test._id === updatedTest._id ? updatedTest : test));
        break;
      default:
        break;
    }
  };


  const renderTestTable = (testType, tests, columns) => (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
            {columns.map((col, idx) => (
              <TableCell key={idx}><strong>{col}</strong></TableCell>
            ))}
           {userRole === 'admin' && (  <TableCell colSpan={2}><strong>Actions</strong></TableCell> )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.length > 0 ? (
            tests.map((test) => (
              <TableRow key={test._id}>
                {columns.map((col, idx) => (
                  <TableCell key={idx}>{test[col]}</TableCell>
                ))}
               {userRole === 'admin' && (  <TableCell style={{ padding: '0 4px' }}>
                  <IconButton onClick={() => handleOpenEditDialog(test)} color="success">
                    <PencilSquare />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(test)} color="error">
                    <Trash />
                  </IconButton> 
                </TableCell>  )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} align="center">
                No {testType} available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const testTypes = {
    TestRadiologiques: {
      tests: testRadiologiques,
      columns: ['radiographiePulmonaire', 'asp']
    },
    TestBacteriologiques: {
      tests: testBacteriologiques,
      columns: ['hemoculture', 'pl', 'ecbu']
    },
    TestBiologiques: {
      tests: testBiologiques,
      columns: ['hemogramme', 'procalcitonine', 'crp']
    }
  };

  const getEditComponent = (testType) => {
    console.log(`getEditComponent called with type: ${testType}`);
    switch (testType) {
      case 'Test Radiologiques':
        return EditRadiologicTest;
      case 'Test Bactériologiques':
        return EditBacteriologicTest;
      case 'Test Biologiques':
        return EditBiologicTest;
      default:
        return null;
    }
  };

  const EditComponent = selectedTest ? getEditComponent(selectedTest.type) : null;

  return (
    <Container style={{ marginTop: '3%' }}>
      <Box display="flex" alignItems="center" marginBottom="30px">
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
            <InputLabel>Informations sur le cas pédiatriques</InputLabel>
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
       {userRole === 'admin' && (  <div style={{ marginLeft: '15%' }}>
          <IconButton onClick={handleOpenAddDialog}>
            <AddCircleOutlineIcon style={{ color: '#89CFF0', fontSize: '25px' }} />
          </IconButton>
        </div> )}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        Object.keys(testTypes).map((type) => (
          renderTestTable(type, testTypes[type].tests, testTypes[type].columns)
        ))
      )}
     {userRole === 'pediatre' && (
       <div style={{ position: 'relative' }}>
       <Link
         variant="contained"
         color="primary"
         onClick={() => setOpenReviewDialog(true)}
         style={{ position: 'absolute', top: '50px' }} 
       >
         Ajouter votre avis 
       </Link>
     </div>
      )}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Ajouter Un Test</Title></DialogTitle>
        <DialogContent>
          <AddTest onClose={handleCloseAddDialog}  caseId={selectedCaseId}/>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseAddDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} style={{ width: 1000 }}>
        <DialogTitle><Title>Modifier Un Test</Title></DialogTitle>
        <DialogContent>
          {selectedTest && EditComponent && React.createElement(EditComponent, {
            test: selectedTest,
            onClose: handleCloseEditDialog,
            onEditSuccess: updateTestState
          })}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseEditDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer ce Test?</em>
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
     
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Title>Ajouter votre avis</Title>
        </DialogTitle>
        <DialogContent>
          <AddReviewForm caseId={selectedCaseId} onClose={() => setOpenReviewDialog(false)}
           refresh={() => setRefresh(!refresh)} />
        </DialogContent>
       
      </Dialog>

       <Snackbar 
           onClose={handleCloseSnackBar} open={openSnackbar} 
           autoHideDuration={2000}
           anchorOrigin={{vertical:'top' , horizontal:'right'}}>
           <MuiAlert onClose={handleCloseSnackBar} color='success' sx={{ width: '100%' }}>
            {successMessage}
          </MuiAlert>
       </Snackbar>


    </Container>
  );
};

export default Tests;
