
import React, { useState, useEffect } from 'react';
import { TextField, Button, DialogActions, DialogContent, Typography } from '@mui/material';
import notificationservices from '../../services/notificationServices';
import userServices from '../../services/userServices';
import { useAuth } from '../authentification/AuthContext';
import { useSocket } from '../../Socket/socketContext';

const AddReviewForm = ({ caseId, onClose, refresh }) => {
  const { user } = useAuth();
  const [reviewContent, setReviewContent] = useState('');
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState('');

  const socket = useSocket();

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const userProfile = await userServices.getUserById(user._id);
        setUserImage(userProfile.image);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserImage();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const admins = await userServices.getUsersByRole('admin');

      await Promise.all(
        admins.map(async (admin) => {
          const notificationData = {
            message: `${user.firstname} ${user.lastname} added a review for case ${caseId}: "${reviewContent}"`,
            createdBy: user._id,
            sentTo: admin._id,
            image: userImage,
            //caseId: caseId,
            reviewContent: reviewContent, 
          };

          await notificationservices.createNotification(notificationData);

          if (socket) {
            socket.emit('sendNotification', notificationData);
          }
        })
      );

      setReviewContent('');
      if (refresh) refresh();
      onClose();
    } catch (error) {
      setError('Failed to submit review or notify admins. Please try again.');
      console.error('Error submitting review or notifying admins:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          Submit
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddReviewForm;
