import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddSymptomForm from './addSymptom';
import CloseIcon from '@mui/icons-material/Close';
import Title from '../title/title';
import casesServices from '../../services/casesServices';
import EditSymptomForm from './editSymptoms';
import symptomsServices from '../../services/symptomsServices';
import { Link } from 'react-router-dom';
import { Container, Grid , FormControl,Typography, Box, InputLabel, Select, MenuItem, Table, 
  IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
   Button, Checkbox, Dialog, DialogContent, DialogTitle, DialogActions, 
   Snackbar} from '@mui/material';
 import AddReviewForm from '../Review/addReview';
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
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

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
          setSymptoms(response);
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
        {userRole === 'admin' && (
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
        <DialogTitle><Title>Ajouter un nouveau symptôme</Title></DialogTitle>
        <DialogContent>
          <AddSymptomForm caseId={selectedCaseId} refresh={() => setRefresh(!refresh)}/>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleCloseAddDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle><Title>Modifier le symptôme</Title></DialogTitle>
        <DialogContent>
          <EditSymptomForm symptom={selectedSymptom} caseId={selectedCaseId} />
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleCloseEditDialog}>
            <CloseIcon />
          </IconButton>
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
           <MuiAlert onClose={handleCloseSnackBar} color='success' sx={{ width: '100%' }}>{successMessage}</MuiAlert>
       </Snackbar>


    </Container>
  );
};

export default Symptoms;


//backgroundColor: "#231955",


//mongodump
//mongorestore*


/*const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = Schema({
  note: { type: Object },
  created: { type: Date, default: new Date() },
  important: { type: Boolean },
  type: { type: String },
  idTimer:{type:Number},
  readen: { type: Boolean, default: false },
  receiverLevel: { type: String },
  receiver_Id: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

const Notification = mongoose.model("Notification", NotificationSchema);
*/
/*



exemple:
note: { subject: "Platforme Etudiant - Notification",text:`Un compte utilisateur a été modifié`,admin:props.currentUser.name,level:"user",startDate:"",endDate:"",operation:operation,userName: props.item&&props.item.name,
   userEmail: props.item.local && props.item.local.email},date:2000, important: true, type: "notif-user", level: "", adminEmail: props.currentUser.email }*/



   /*notificationController.getAllNotificationsSortedByDateTimeAndLimited = async (
  req,
  res,
  next
) => {
  const currentUser_id = req.user._id;
  try {
    const notifications = await Notification.find({
      receiver_Id: currentUser_id
    })
      .sort({ _id: -1 })
      .limit(6);
    const notif = await Notification.find({
      receiver_Id: currentUser_id,
      readen: false
    });
    return res.send({
      success: true,
      nbNotifications: notif.length,
      notifications 
      
      //
      
      // readen notifications
notificationController.setToReadenNotification = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updatedNotification = await Notification.updateMany(
      { receiver_Id: id },
      {
        $set: {
          readen: true
        }
      }
    );
    res.send({
      success: true
    });
  } catch (e) {
    res.send({
      success: false
    });
    next(e);
  }


  //
   notificationController.destroy = async (req, res, next) => {
  const notification_id = req.params.id;

  try {
    await Notification.deleteOne({ _id: notification_id });
    return res.send({
      success: true,
      message: "Notification deleted with success!"
    });
  } catch (e) {
    next(e);
  }
};

}; */