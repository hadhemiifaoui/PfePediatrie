import React, { useState, useEffect } from 'react';
import { TextField, Button, DialogActions, DialogContent, Typography , Snackbar} from '@mui/material';
import notificationservices from '../../services/notificationServices';
import userServices from '../../services/userServices';
import { useAuth } from '../authentification/AuthContext';
import { useSocket } from '../../Socket/socketContext';
import MuiAlert from '@mui/material/Alert';

import Title from '../title/title';


const AddReviewForm = ({ caseId, onClose, refresh }) => {
  const { user } = useAuth();
  const [reviewContent, setReviewContent] = useState('');
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const socket = useSocket();


  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const userProfile = await userServices.getUserById(user._id);
        setUserImage(userProfile.image);
      } catch (error) {
        console.error('error get user profile', error);
      }
    };
  
    fetchUserImage();
  }, [user._id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!reviewContent.trim()) {
      setError('Ecrivez votre avis avant de l`envoyer');
      return;
    }
  
    try {
      const admins = await userServices.getUsersByRole('admin');
  
      await Promise.all(
        admins.map(async (admin) => {
          const notificationData = {
            message: `${user.firstname} ${user.lastname} a ajouté un avis: "${reviewContent}"`,
            createdBy: user._id,
            sentTo: admin._id,
            image: userImage,
            reviewContent: reviewContent,
          };
  
          await notificationservices.createNotification(notificationData);
          if (socket) {
            socket.emit('sendNotification', notificationData);
          }
        })
      );
      setSuccessMessage('Votre avis a été envoyé avec succès');
      setOpenSnackbar(true);
  
      setReviewContent('');
      if (refresh) refresh();
    } catch (error) {
      setError('Échec de l`envoi');
      console.error('Error: ', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={{marginLeft: '10%' , marginRight : '20%' , marginTop : "8%"}}>
       <Typography sx={{marginLeft :"5%"}}><Title>Ajouter votre avis </Title></Typography>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="reviewContent"
          label="Review"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary">
           Envoyer 
        </Button>
        <Button onClick={onClose} color="secondary">
           Annuler
        </Button>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} color="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default AddReviewForm;
