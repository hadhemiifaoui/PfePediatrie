import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, useTheme, Dialog, DialogContent, DialogActions } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddHealthConditionForm from './healthconditionAddForm';
import Title from '../../title/title';
import { useAuth } from '../../authentification/AuthContext';
import CloseIcon from '@mui/icons-material/Close';


const SectionCard = ({ title, children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {userRole} = useAuth();
  const [refresh , setRefresh] = useState(false)

  const { user } = useAuth();
  const patientId = user ? user._id : localStorage.getItem('userid');
  const childId = localStorage.getItem('childId')
  console.log(childId)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ marginBottom: 2, borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '10px',
          }}
        >
         <Title>{title}</Title>
         {userRole === 'pediatre' && (
           <IconButton onClick={handleOpen}>
             <AddCircleOutlineIcon />
           </IconButton>
         )} 
        </Typography>
        {children}
      </CardContent>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <AddHealthConditionForm onClose={handleClose} childId={childId} patientId={patientId} 
          refresh={() => setRefresh(!refresh)} />
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

    </Card>
  );
};

export default SectionCard;
