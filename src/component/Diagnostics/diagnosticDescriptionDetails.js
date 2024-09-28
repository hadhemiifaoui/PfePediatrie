import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Title from '../title/title'
import CloseIcon from '@mui/icons-material/Close';


const DiagnosticDescriptionDetails = ({ open, onClose, diagnostic }) => {
  if (!diagnostic) return null;

  return (
    <Dialog open={open} onClose={onClose}  maxWidth="md" fullWidth>
      <DialogTitle><Title>Diagnostic Details</Title></DialogTitle>
      <DialogContent>
      <Typography variant="h6"><strong>Description</strong></Typography>
      <Typography variant="body1">{diagnostic.description}</Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={onClose} color="primary">
            <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiagnosticDescriptionDetails;
