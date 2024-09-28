import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import Title from '../title/title';
import jsPDF from 'jspdf';

const DiagnosticTreatementPlanDetailsDialog = ({ open, onClose, diagnostic }) => {
  if (!diagnostic) return null;

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const content = document.getElementById('treatment-plan-content');

    pdf.html(content, {
      callback: (pdf) => {
        pdf.save('treatment-plan.pdf');
      },
      x: 10,
      y: 10,
      width: 180, 
      windowWidth: content.scrollWidth
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle><Title>Plan De Traitement</Title></DialogTitle>
      <DialogContent id="treatment-plan-content">
        
        <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: diagnostic.treatmentPlan }} />
      </DialogContent>
      <DialogActions>
        <IconButton onClick={downloadPDF} color="primary" aria-label="download"> 
         <GetAppIcon />
        </IconButton>
        <IconButton onClick={onClose} color="primary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiagnosticTreatementPlanDetailsDialog;
